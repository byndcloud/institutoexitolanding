<template lang="pug">
  v-container.events
    v-toolbar(color='#4d57a6' dark='')
      v-btn(flat='' @click='$refs.calendar.prev()')
        v-icon(left='') arrow_left
        |  M&ecirc;s anterior
      v-spacer
      v-toolbar-title Eventos do m&ecirc;s {{monthDisplay}} de {{yearDisplay}}
      v-spacer
      v-btn(flat='' @click='$refs.calendar.next()')
        | M&ecirc;s posterior
        v-icon(right='') arrow_right
    v-layout(column='')
      v-calendar(ref='calendar' v-model='calendarDate' :type='type' :end='endCalendarDate' color='primary' locale='pt-br')
        template(v-slot:day='{ date }')
          template(v-for='event in eventsMap[date]')
            v-menu(:key="event['.uid']" v-model='event.open' full-width='' offset-x='')
              template(v-slot:activator='{ on }')
                .my-event(v-if='event.date' v-ripple='' v-on='on' @click='editEvent(event)' v-html='event.title')
    v-fab-transition
      v-btn(fab='' large='' dark='' bottom='' right='' fixed='' color='#4d57a6' @click='addEvent()')
        i.material-icons
          | add
    v-dialog(v-model='eventDialog' transition='dialog-bottom-transition')
      v-card.pa-0
        v-toolbar.headline.pa-0.ma-0.elevation-3
          | Detalhes do evento
          v-spacer
          v-btn(v-if="event['.uid']" color='primary' ripple='' @click='duplicateEvent(event)')
            | Duplicar evento
            v-icon(right='') fas fa-copy
          v-btn(v-if="event['.uid']" color='warning' ripple='' @click='deleteEvent(event)')
            | Remover evento
            v-icon(right='') fas fa-trash
          v-btn(icon @click='eventDialog = false')
            v-icon close
          // Visíbilidade<v-icon right color="grey lighten-1">fas fa-eye</v-icon>
        v-card-text
          v-form
            v-layout(align-start='' justify-start='' row='' wrap='' fill-height='')
              v-flex(sm12='')
                v-layout(row='' wrap='')
                  v-flex(xs12 sm6 md8)
                    v-checkbox(color='info' ripple='' v-model='event.visible' :label='`Postagem vísivel no site`')
                  v-flex(xs12='' sm6='' md8='')
                    v-text-field(v-model='event.title' label='Títutlo do evento' required='')
                  v-flex(xs12='' sm6='' md4='')
                    v-menu(v-model='showDatePicker' :close-on-content-click='true' :nudge-right='40' lazy='' transition='scale-transition' offset-y='' full-width='' min-width='290px')
                      template(v-slot:activator='{ on }')
                        v-text-field(v-model='event.date' label='Selecione a data do evento' prepend-icon='event' readonly='' v-on='on')
                      v-date-picker(v-model='event.date' no-title='' scrollable='')
                  v-flex(xs12='' md8='')
                    v-text-field(v-model='event.subtitle' label='Subtítulo' required='')
                  v-flex(xs12='' sm3='' md2='')
                    v-menu(ref='menuTimeStart' v-model='showTimePicker' :close-on-content-click='false' :nudge-right='40' :return-value.sync='event.time' lazy='' transition='scale-transition' offset-y='' full-width='' max-width='290px' min-width='290px')
                      template(v-slot:activator='{ on }')
                        v-text-field(v-model='event.time' label='Horário do evento' prepend-icon='access_time' readonly='' v-on='on')
                      v-time-picker(v-if='showTimePicker' v-model='event.time' full-width='' @click:minute='$refs.menuTimeStart.save(event.time)')
                  v-flex(xs12='' sm3='' md2='')
                    v-menu(ref='menuTimeEnd' v-model='showTimeEndPicker' :close-on-content-click='false' :nudge-right='40' :return-value.sync='event.timeEnd' lazy='' transition='scale-transition' offset-y='' full-width='' max-width='290px' min-width='290px')
                      template(v-slot:activator='{ on }')
                        v-text-field(v-model='event.timeEnd' label='Horário de término' prepend-icon='access_time' readonly='' v-on='on')
                      v-time-picker(v-if='showTimeEndPicker' v-model='event.timeEnd' full-width='' @click:minute='$refs.menuTimeEnd.save(event.timeEnd)')
                  v-flex(xs12='' sm6='')
                    v-text-field(v-model='event.location_detail' label='Endereço: 15º Andar, sala 05' required='')
                  v-flex(xs12='' sm6='')
                    v-text-field(v-model='event.location_address' label='Endereço.: Rua de Exemplo, Nº de Exemplo' required='')
              v-flex(xs12='')
                v-text-field(v-model='event.video_url' label='Link do vídeo no YouTube')
              v-flex(sm8='')
                label.grey--text Descri&ccedil;&atilde;o do evento
                quill-editor(v-model='event.details' ref='myQuillEditor')
              v-flex(sm4='')
                vue-upload-multiple-image(:maxImage='20' :data-images='images' @upload-success='uploadImageSuccess' @before-remove='beforeRemove' @edit-image='editImage' @data-change='dataChange' dragText='Arraste e solte as imagens' browseText='Carregar imagens' primaryText='Principal' markIsPrimarytext='Marcar como principal' popupText='Esta imagem será exibida como padrão' dropText='Solte seu arquivo aqui ...    ')
            v-layout(row='' justify-space-between='' mt-4='')
              v-btn(@click='eventDialog = false') Cancelar
              v-btn(color='info' @click='saveEvent()')
                v-icon(left='') save
                | Salvar
    v-dialog(v-model='loading' hide-overlay='' persistent='' width='300')
      v-card(color='#4d57a6' dark='')
        v-card-text
          | Carregando...
          v-progress-linear.mb-0(indeterminate='' color='white')
    v-dialog(v-model='duplicating' hide-overlay='' persistent='' width='300')
      v-card(color='#4d57a6' dark='')
        v-card-text
          | Aguarde, duplicando evento...
          v-progress-linear.mb-0(indeterminate='' color='white')
</template>

<script>
/* eslint-disable */
  import firebase from '../firebase.js'
  import VueUploadMultipleImage from 'vue-upload-multiple-image'
  import Datepicker from 'vuejs-datepicker';
  import MD5 from 'md5'
  import axios from 'axios'
  import moment from 'moment'
  // require styles
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'

  import { quillEditor } from 'vue-quill-editor'

  export default {
    name: 'Events',
    fiery: true,
    components: {
      VueUploadMultipleImage,
      Datepicker,
      quillEditor
    },
    data() {
      return {
        showTimePicker: false,
        showTimeEndPicker: false,
        landscape: '',
        picker: '',
        loading: false,
        images: [],
        events: this.$fiery(firebase.firestore.collection('events'), {
          query: q => q.where('active', '==' ,true).orderBy('date', 'asc')
        }),
        eventDialog: false,
        eventDate: null,
        event: {
          title: '',
          details: '',
          date: null,
          dates: [],
          images: [],
          video_url: ''
        },
        showDatePicker: false,
        showDatesPicker: false,
        actualEvent: null,
        type: 'month',
        calendarDate: moment().format('YYYY-MM-DD'),
        endCalendarDate: moment().format('YYYY-MM-DD'),
        yearDisplay: moment().format('YYYY'),
        monthDisplay: moment().format('MM'),
        duplicating: false
      }
    },

    computed: {
      // convert the list of events into a map of lists keyed by date
      eventsMap() {
        const map = {}
        this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e))
        console.log(map)
        return map
      }
    },
    methods: {
      async uploadImageSuccess(formData, index, fileList) {        
        let imageFile = fileList[index]        
        const self = this;

        const downloadURL = await new Promise(function (resolve, reject) {
          console.log('firebase')
          var storageRef = firebase.storage.ref('/eventsimages/'+MD5(imageFile.path));


          //Upload file
          // var task = storageRef.put(imageFile);
          storageRef.getDownloadURL().then((downloadURL) => {
            console.log('downloadURL already exists')
            resolve(downloadURL)
          })
          .catch(() => {
            var task = storageRef.putString(imageFile.path, 'data_url').then((upSnap) => {
              
            })
            //Update progress bar
            task.on('state_changed',
              function progress(snapshot) {
                var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                console.log('percentage' + percentage)
                self.progressUpload = percentage;
              },
              function error(err) {
                console.log('error')
              },
              function complete(snapshot) {
                console.log('done')
                resolve(task.snapshot.downloadURL)
              }
            );
          })          
        });
        
        imageFile.indexOnSelector = index
        imageFile.path = downloadURL
        this.event.images.push(imageFile)        
      },
      beforeRemove(index, done, fileList) {                        
        this.event.images = this.event.images.filter((image) => {
          return image.indexOnSelector !== index
        })
        done();
        // this.events.images = fileList;
      },
      editImage(formData, index, fileList) {
        // console.log('editImage', formData, index, fileList)
      },
      dataChange(data) {
        // console.log('dataChange', data)
      },
      addEvent() {
        this.event = {
          '.uid': '',
          title: '',
          subtitle: '',
          details: '',
          location_address: '',
          location_detail: '',
          time: '',
          timeEnd: '',
          date: '',
          dates: [],
          images: [],
          video_url: ''
        }
        this.eventDialog = true
      },
      async editEvent(event) {
        console.log('Id do evento a ser editado' + event['.uid'].split('/')[4])
        
        this.loading = true;
        firebase.firestore.collection('events').doc(event['.uid'].split('/')[4]).onSnapshot((doc) => {          
          this.event = doc.data()
          this.event['.uid'] = event['.uid'].split('/')[4]
          // index on event.images to could remove properly
          this.event.images = this.event.images.map((imagem, i) => {
            imagem.indexOnSelector = i
            return imagem
          })
          this.images = this.event.images
          this.eventDialog = true
          this.loading = false
        })
      },
      deleteEvent(event) {
        // let eventCode = event['.uid'].split('/')[4] // get doc id
        let eventCode = this.event['.uid']
        console.log(`Delete event |${eventCode}|`)
        firebase.firestore.collection('events').doc(eventCode).set({
          active: false
        }, {
          merge: true
        }).then(() => {
          this.$nextTick(() => {
            this.eventDialog = false
          })        
        })      
      },
      duplicateEvent(event) {
        this.duplicating = true
        console.log(event)
        this.event = event
        this.event['.uid'] = ''
        this.saveEvent()
        this.duplicating = false
      },
      async saveEvent() {
        let url

        let video_url
        if (this.event.video_url) { 
          video_url = this.event.video_url.replace('watch?v=', 'embed/')
        }
        this.loading = true
        let eventToSave = {          
          active: true,
          open: false,
          visible: this.event.visible ? true : false,
          title: this.event.title,
          subtitle: this.event.subtitle,
          time: this.event.time,
          timeEnd: this.event.timeEnd,
          subtitle: this.event.subtitle,
          location_address: this.event.location_address,
          location_detail: this.event.location_detail,
          details: this.event.details,
          dates: this.event.dates,
          date: this.event.date,
          images: this.event.images,
          video_url: video_url || ''
        }
        try {
          console.log(`Salvando o evento! |${this.event['.uid']}|`, eventToSave)
          let eventUid = this.event['.uid']
          console.log(eventUid)
          if (typeof eventUid !== typeof undefined && eventUid.length > 0) {
            console.log(`.uid: |${eventUid}|`)
            await firebase.firestore.collection('events').doc(eventUid).set(eventToSave, {
              merge: true
            })
          } else {
            await firebase.firestore.collection('events').add(eventToSave)
          }
        } catch (err) {
          console.error(err)
          this.loading = false
        }
        this.loading = false
        this.eventDialog = false
      },
      onPickFile() {
        this.$refs.fileInput.click()
      },
      onFilePicked(event) {
        const files = event.target.files
        let filename = files[0].name

        if (filename.lastIndexOf('.') <= 0) {
          return alert('Formato de arquivo inválido ')
        }

        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imgUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]
      }
    }
  }
</script>

<style>
  .events .padding {
    padding: 1.5rem;
  }

  .ql-editor {
    min-height: 140px;
  }
  
  .v-card {
    padding: 1rem;
  }

  .theme--light.v-calendar-weekly .v-calendar-weekly__day {
    min-height: 70px;
  }

  .my-event {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: #1867c0;
    color: #ffffff;
    border: 1px solid #1867c0;
    width: 100%;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
  }

  label.image-edit	{    
    display: none !important;
  }
  .image-container, .preview-image, .image-overlay, .image-list-item {
    border-radius: 0px !important;
  }
  .image-container {
    margin: 20px !important
  }
</style>