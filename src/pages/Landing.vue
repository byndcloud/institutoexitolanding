<template>
  <v-container pa-0 ma-0 class="minWidth container">
    <v-container ma-0 pa-0 class="minWidth banner" style="height: calc(100vh)">
      <v-layout fill-height align-center class="orangeOverlay">
        <v-layout align-center justify-center class="bannerContent">
          <carousel
            class="minWidth"
            :centerMode="true"
            :perPage="1"
            :autoplay="true"
            :autoplayTimeout="5500"
            :loop="true"
            paginationColor="#ffffff"
            paginationActiveColor="#ffffff"
          >
            <slide v-for="banner in banners" :key="banner['.uid']">
              <v-flex text-xs-center class="fadeIn">
                <div class="display-3 title1 font-weight-bold">{{banner.title_1}}</div>
                <div class="display-2 title2">{{banner.title_2}}</div>
                <div class="my-3">
                  <v-layout justify-center>
                  <!-- <v-flex shrink>
                  <v-sheet class="darken-1 blink_me caption" dark color="yellow">
                    <v-icon class="caption">rss_feed</v-icon> AO VIVO
                  </v-sheet>
                  </v-flex> -->
                  <v-flex v-if="youtube.video.active" shrink href="#streaming" @click="startTransmission()" style="cursor: pointer">
                    <v-sheet class="darken-1 caption" dark color="grey" style="max-width: 75px; font-size: 8px !important">
                        <!-- <v-flex> <v-icon class="caption">rss_feed</v-icon> </v-flex> -->
                        <i v-if="youtube.video.ready" class="caption" style="font-size: 8px !important">AO VIVO</i>
                        <i v-else  class="caption" style="font-size: 8px !important">A partir das 19h</i>

                    </v-sheet>
                    <v-sheet class="darken-1" dark color="error">
                      <v-layout v-if="youtube.video.active" row pa-2 align-center justify-center>
                        <v-flex> </v-flex>
                        <v-flex> ACOMPANHE O SEMINÁRIO FACING THE GIANTS</v-flex>
                      </v-layout>
                    </v-sheet>
                  </v-flex>
                  </v-layout>
                </div>
                <div class="my-3">
                  <v-btn large outline color="#fff" dark :href="banner.btn_link">
                    <v-icon left>record_voice_over</v-icon> {{banner.btn_text}}
                  </v-btn>
                </div>
              </v-flex>
            </slide>
          </carousel>
        </v-layout>
      </v-layout>
      <!-- <v-snackbar
        absolute
        class="pa-0"
        v-model="snackbarProximosEventos"
        bottom
        left
        :timeout="7500"
        @click="snackbarProximosEventos = false"
      >
         <v-btn class="ma-0" flat href="#proximoseventos">
          <v-icon left>event</v-icon>Próximos eventos
        </v-btn>
        <v-btn class="ma-0" flat @click="snackbarProximosEventos = false">
          <v-icon left>close</v-icon>
        </v-btn>
      </v-snackbar> -->
    </v-container>
    <v-container v-if="youtube.video.active" id="streaming" pa-0 ma-0 class="minWidth">
      <br/><br/>
      <v-layout column justify-center align-center class="about">
        <v-layout row wrap>
          <v-flex xs12 mb-0><v-chip v-if="youtube.video.ready" color="error" style="color: #fff"><v-icon class="blink_me">fiber_manual_record</v-icon>AO VIVO</v-chip></v-flex>
          <v-flex xs12 mt-0 class="genericTitle"><h3>Seminário Facing the Giants com {{youtube.video.spoker}}</h3></v-flex>
        </v-layout>

        <v-layout class="aboutContent">
          <youtube v-if="youtube.video.embbed && youtube.video.ready" :video-id="youtube.video.url" :player-vars="{autoplay: 1}" @ready="ready" @playing="playing" :player-width="youtube.width"></youtube>
          <v-btn v-if="!youtube.video.embbed && youtube.video.ready" class="white--text" large color="#FF5252" :href="`https://www.youtube.com/watch?v=${youtube.video.url}`"> Assista ao vivo clicando aqui </v-btn>
          <!-- <h3 v-else mt-4 pt-4> A transmissão ao vivo terá inicio a partir das 19h </h3> -->
        </v-layout>
      </v-layout>
    </v-container>
    <v-container id="sobre" pa-0 ma-0 class="minWidth">
      <v-layout column class="about">
        <v-layout class="genericTitle">Acreditamos no seu potencial para empreender</v-layout>
        <v-layout class="aboutContent">{{initContent.about_us}}</v-layout>
      </v-layout>
    </v-container>
    <v-container class="pt-0 mt-0 minWidth videoInst">
      <v-layout justify-center row wrap>
        <v-flex sm12 md6>
          <v-layout pa-4 fill-height column justify-center align-left>
            <div class="titleVideo">Somos todos empreendedores loucos!</div>
          </v-layout>
        </v-flex>
        <v-flex sm12 md6>
          <v-layout fill-height align-center>
            <div class="elevation-4">
              <video :style="{width: '100%'}" controls>
                <source
                  src="https://firebasestorage.googleapis.com/v0/b/instituto-exito-a06b4.appspot.com/o/exito_video_lancamento%20(online-video-cutter.com).mp4?alt=media&token=e26c2643-b2bc-4d33-8808-0b95856e91a5"
                  type="video/mp4"
                >Seu navegador não suporta vídeos MP4
              </video>
              <!-- <Media :kind="'video'" :controls="true" :style="{width: '100%'}"
                :src="['https://firebasestorage.googleapis.com/v0/b/instituto-exito-a06b4.appspot.com/o/midia%2Fexito_video_lancamento.mp4?alt=media&token=5a5feb60-2505-474c-83e2-6f446139b37c']">
              </Media>-->
            </div>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
    <exito-inspirational></exito-inspirational>
    <v-container pa-0 ma-0 class="minWidth">
      <v-layout class="aboutTopics">
        <v-layout class="listRow">
          <v-flex md6 sm12 v-for="i in aboutTopics" :key="i.title">
            <v-layout column my-3 px-4 class="purposeCard">
              <div class="purposeIcon">
                <div :style="imgUrl(i.icon)" class="icon"></div>
              </div>
              <div class="purposeTitle">
                <span style="height: min-content;">{{i.title}}</span>
              </div>
              <div class="purposeContent">{{i.text}}</div>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-container>
    <v-container id="proximoseventos">
      <br>
      <br>
      <br>
      <span class="genericTitle pl-4">Próximos Eventos</span>
      <v-list v-if="events.length > 0" two-line>
        <template v-for="(item, index) in events">
          <v-divider :key="index" class="ml-4 mr-4 mb-2 mt-2" v-if="index > 0"></v-divider>
          <!-- <v-list-tile :key="item['.uid']" style="min-height: 190px" class="pt-4">
          <v-list-tile-content style="min-height: 190px">-->
          <v-flex :key="item['.uid']">
            <v-container fluid>
              <v-layout row wrap justify-start align-start>
                <v-flex xs3 sm2 md1 class="text-xs-left" style="line-height: 0.15 !important">
                  <v-layout row wrap align-center justify-start>
                    <v-flex>
                      <v-layout row align-center justify-center>
                        <v-flex shrink style="line-height: 0.15 !important">
                          <span
                            class="text-xs-right display-3 pd-0 md-0 font-weight-thin"
                          >{{ getOnlyDate(item.date) }}</span>
                        </v-flex>
                        <v-flex shrink class="pl-1" style="line-height: 1.15 !important">
                          <!-- :justify-center="$vuetify.breakpoint.xsAndDown" :align-center="$vuetify.breakpoint.xsAndDown" -->
                          <v-layout justify-start align-center column>
                            <v-flex xs6 sm12>
                              <span
                                class="caption mt-0 pt-0 pd-0 md-0 text-xs-center font-weight-thin"
                                style="text-transform: uppercase"
                              >
                                <strong>{{new Date(item.date).toLocaleString('pt-br', { month: 'short' })}}</strong>
                              </span>
                            </v-flex>
                            <v-flex xs6 sm12>
                              <v-icon class="mt-1 text-xs-center">today</v-icon>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex xs12 class="mt-0 pt-0">
                      <v-layout v-if="item.timeEnd" fill-height align-center justify-center>
                        <v-icon class="caption">access_time</v-icon>
                        <span class="caption grey--text text--darken-2">&nbsp;{{ item.time }}</span>
                        <span class="caption grey--text text--darken-2">&nbsp;-&nbsp;</span>
                        <span class="caption grey--text text--darken-2">{{item.timeEnd}}</span>
                      </v-layout>
                      <v-layout v-else fill-height align-center justify-center>
                        <v-icon>access_time</v-icon>
                        <span class="body-1 grey--text text--darken-2">{{ item.time }}</span>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <!-- ${$vuetify.breakpoint.mdAndDown ? 'pl-3' : 'pl-3'} -->
                <v-flex xs9 sm10 md11 class="mt-2 pl-3">
                  <h3 class="headline font-weight-light">{{item.title}}</h3>

                  <v-flex mb-2 style="margin-bottom: 10px" v-if="item.subtitle && item.subtitle.length > 0">
                    <v-icon class="pr-1" style="float: left">bookmark_border</v-icon>
                    <div class="body-2 grey--text text-justify">{{item.subtitle}}</div>
                  </v-flex>

                  <v-flex mb-2>
                    <v-icon class="pr-1" style="float: left">comment</v-icon>
                    <div class="caption grey--text text-justify quill-text" v-html="item.details"></div>
                  </v-flex>

                  <v-flex mb-2>
                    <a
                      class="caption grey--text"
                      :href="`https://maps.google.com/?q=${item.location_address}`"
                      target="_blank"
                      style="text-overflow: ellipsis;text-decoration: none!important"
                    >
                      <v-icon class="pr-1" style="float: left">location_on</v-icon>
                    </a>
                    <div class="caption grey--text text-justify" v-html="item.location_detail"></div>
                  </v-flex>

                  <a
                    class="caption grey--text"
                    :href="`https://maps.google.com/?q=${item.location_address}`"
                    target="_blank"
                    style="text-overflow: ellipsis;text-decoration: none!important"
                  >{{item.location_address}}</a>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </template>
        <v-flex>
          <v-layout row justify-center>
            <v-btn flat large @click="loadEvents()" :loading="loadingEvents">
              <v-icon large> {{ showAllEvents ? 'expand_more' : 'expand_less' }} </v-icon>
              Ver Mais Eventos
            </v-btn>
          </v-layout>
        </v-flex>
          <!-- </v-list-tile-content>
          </v-list-tile>-->
      </v-list>
    </v-container>
    <v-container px-0 id="educacao" class="minWidth">
      <v-layout class="generic">
        <v-flex md6 sm12 px-2>
          <v-img src="static/img/shutterstock_657257209.webp" height="100%" width="100%"></v-img>
        </v-flex>
        <v-flex md6 sm12 px-3>
          <v-layout align-center fill-height justify-center>
            <v-layout column>
              <div class="genericTitle">Nossa plataforma de cursos</div>
              <div class="genericContent">
                O
                <span class="font-weight-bold">INSTITUTO ÊXITO</span> disponibilizará uma ampla plataforma com cursos
                online, gratuitos. Nosso objetivo é ajudar os potenciais empreendedores
                de todos os públicos, principalmente alunos de escolas públicas, a adquirirem
                habilidades e competência para se desenvolverem pessoal e profissionalmente,
                especialmente, mas não se limitando, a aquisição da competência de geração de
                trabalhabilidade no sentido de criarem seus empreendimentos e gerarem riqueza,
                renda e emprego.
              </div>
              <div class="my-4">
                <span class="btn text-uppercase">
                  <a href="https://www.toolzz.com.br/institutoexito" target="_blank">Conheça</a>
                </span>
              </div>
            </v-layout>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container id="membros" class="minWidth team">
      <v-layout px-4 py-3 class="font-weight-black display-1">
        <div style="font-size: 1.2em; line-height: 35pt;">Sócios-fundadores</div>
      </v-layout>
      <v-layout align-center class="minWidth">
        <carousel
          class="minWidth"
          :centerMode="true"
          :perPage="1"
          :perPageCustom="perPageCustom"
          :autoplay="true"
          :autoplayTimeout="3100"
          :loop="true"
          paginationColor="#ffffff"
          paginationActiveColor="#ffffff"
          :paginationEnabled="$vuetify.breakpoint.smAndDown ? false : true"
        >
          <slide v-for="member in members" :key="member['.uid']">
            <v-layout column align-center>
              <div :style="imgUrl(member.img_url)" class="memberImage"></div>
              <div class="headline font-weight-bold mt-3 mb-2">{{member.name}}</div>
              <div class="text-xs-center title">{{member.role}}</div>
            </v-layout>
          </slide>
        </carousel>
      </v-layout>

      <!-- <v-layout align-center class="minWidth hidden-md-and-up" style="margin: 60px 0 20px 0;">
        <carousel class="minWidth" :centerMode="true" :perPage="1" :autoplay="true" :loop="true"
          paginationColor="#4d57a6" paginationActiveColor="#4d57a6" :touchDrag="true">
          <slide v-for="member in members" :key="member['.uid']">
            <v-layout column align-center>
              <div :style='imgUrl(member.img_url)' class="memberImage"></div>
              <div class="headline font-weight-bold mt-3 mb-2">{{member.name}}</div>
              <div class="text-xs-center title">{{member.role}}</div>
            </v-layout>
          </slide>
        </carousel>
      </v-layout>-->
    </v-container>
    <v-container>
      <v-layout justify-center align-center class="minWidth">
        <v-btn class="white--text" large color="#4d57a6" href="/membros"> Ver todos os sócios </v-btn>
        <v-btn class="white--text" large color="#4d57a6" href="/contribuicao"> Contribuição dos sócios </v-btn>

      </v-layout>
    </v-container>
    <v-container id="desafios" px-0 class="minWidth">
      <v-layout class="generic">
        <v-flex md6 sm12 px-3>
          <v-layout align-center fill-height>
            <v-layout column>
              <div class="genericTitle">Nossos desafios</div>
              <div class="genericContent">
                O
                <span class="font-weight-bold">INSTITUTO ÊXITO</span> atuará na formação de novos empreendedores, bem
                como no aperfeiçoamento de
                quem já é empreendedor. A metodologia de trabalho a ser empregada pelo Instituto será construtiva,
                integrada, participativa e interdisciplinar, valorizando as abordagens quantitativa e qualitativa,
                na busca do formato em rede no sentido de criar áreas de interseção entre as diversas temáticas
                abordadas com o objetivo de construir conhecimento sobre empreendedorismo, articulando o saber e
                o fazer e evoluindo com a produção científica sobre os temas tratados.
              </div>
            </v-layout>
          </v-layout>
        </v-flex>
        <v-flex md6 sm12 px-2>
          <v-img src="static/img/shutterstock_653550529.webp" height="100%" width="100%"></v-img>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container class="minWidth ma-0 documents">
      <v-layout class="genericTitle">Nossos documentos</v-layout>
      <v-layout justify-center row wrap style="padding: 5% 0;">
        <v-layout column my-2>
          <div class="docBoxFolder"></div>
          <div class="docBoxTitle">Nosso Folder de Lançamento</div>
          <div style="align-self: center;">
            <v-btn color="#3ec0ce" dark @click="downloadFolder">
              <v-icon left>cloud_download</v-icon>DOWNLOAD
            </v-btn>
          </div>
        </v-layout>
        <v-layout column my-2>
          <div class="docBoxClearFolder"></div>
          <div class="docBoxTitle">PORTARIA Nº 001</div>
          <div style="align-self: center;">
            <v-btn color="#3ec0ce" dark @click="downloadPortaria">
              <v-icon left>cloud_download</v-icon>DOWNLOAD
            </v-btn>
          </div>
        </v-layout>
        <v-layout column my-2>
          <div class="docBoxCartilha"></div>
          <div class="docBoxTitle">Cartilha do Instituto</div>
          <div style="align-self: center;">
            <v-btn color="#3ec0ce" dark @click="downloadCartilha">
              <v-icon left>cloud_download</v-icon>DOWNLOAD
            </v-btn>
          </div>
        </v-layout>
      </v-layout>
    </v-container>
    <v-container id="contato" px-0 class="minWidth contact">
      <v-layout row wrap justify-center align-start>
        <v-flex py-4 xs12 class="text-xs-center">
          <span class="font-weight-thin display-3">Contato</span>
          <br>
          <br>
          <br>
          <br>
          <v-divider></v-divider>
        </v-flex>

        <v-flex text-xs-center md4 class="ma-0 pa-0">
          <span class="text-xs-center display-1 font-weight-thin">Fale conosco</span>
          <br>
          <br>
          <v-layout column align-center wrap class="width-100">
            <v-flex xs12>
              <v-text-field
                v-model="contact.name"
                background-color="#fff"
                label="Nome"
                required
                outline
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                v-model="contact.mail"
                background-color="#fff"
                label="E-mail"
                outline
                required
              ></v-text-field>
              <v-text-field
                v-model="contact.phone"
                background-color="#fff"
                label="Telefone"
                outline
                required
                mask="## # ####-####"
              ></v-text-field>
              <v-text-field
                v-model="contact.company"
                background-color="#fff"
                outline
                label="Empresa (Opcional)"
              ></v-text-field>
              <v-textarea label="Mensagem" outline v-model="contact.msg" background-color="#fff"></v-textarea>
              <v-btn default @click="sendMessage()">Enviar mensagem</v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex md4 class="text-xs-center">
          <span class="text-xs-center display-1 font-weight-thin">Imprensa</span>
          <br>
          <br>
          <v-layout class="pl-4 ml-4 title font-weight-thin" column justify-start align-start wrap>
            <v-flex>
              <label>Email: mirellaribeiro@institutoexito.com.br</label>
            </v-flex>
            <br>
            <v-flex>
              <label>Telefone: +55 11 3078-9392</label>
            </v-flex>
            <br>
            <v-flex>
              <label>Endereço: Rua Joaquim Floriano, 466</label>
            </v-flex>
            <br>
            <v-flex>
              <label>Brascan Century Corporate, 1001-E</label>
            </v-flex>
            <br>
            <v-flex>
              <label>Itaim Bibi, São Paulo, Brasil.</label>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-snackbar v-model="snackbar" :color="color" :timeout="3000">
        E-mail enviado!
        <v-btn dark flat @click="snackbar = false">
          <v-icon>fas fa-times</v-icon>
        </v-btn>
      </v-snackbar>
    </v-container>
    <!--<v-dialog id="speechJanguie" v-model="openingSpeechDialog" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable>
      <v-card id="card-inside" tile>
        <v-toolbar dark color="#f37b50">
          <v-btn icon dark @click="openingSpeechDialog = false">
            <v-icon>fas fa-times</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-title primary-title>
          <div class="pa-4">
            <div class="headline">Discurso de lançamento do Instituto Êxito de Empreendedorismo</div>
            <span>22 de maio de 2019</span>
          </div>
        </v-card-title>
        <v-card-text>
          <v-content class="pa-4 pt-0" style="text-align: justify">
            <div class="mb-1">
              <span class="font-weight-bold">Minhas senhoras e meus senhores.</span>
            </div>
            <div class="mb-2">
              - Quero iniciar a minha fala registrando a imensa satisfação em estar na noite de hoje
              aqui
              com cada um de vocês para lançar este grandioso projeto de fomento ao empreendedorismo brasileiro e
              latino-americano. Mais gratificante que isso é saber que inicialmente conseguimos juntar um time de 34
              empreendedores visionários, que hoje já são mais de 100, que assim como eu, acreditam que é possível mudar
              o
              brasil a partir do talento e do
              <span
                class="font-weight-bold"
              >dom empreendedor</span> dos nossos jovens e
              que a educação e o empreendedorismo são pilares fundamentais para fazer isto acontecer.
            </div>

            <div class="mb-2">
              - Imagino que todos vocês conhecem um pouco da minha história. Venho de uma família de
              origem humilde. Nasci em uma cidadezinha chamada Santana dos Garrotes, no sertão paraibano e sempre
              estudei
              em escolas públicas. Sai de lá fugindo da seca e da fome e fui morar em Naviraí, no Mato Grosso do Sul, e
              posteriormente em Pimenta Bueno, estado de Rondônia. Aos 8 anos fui engraxate de rua, depois, vendedor de
              laranjas e de picolés de casa em casa. Dos 10 aos 14 anos de idade trabalhei como garçon, vendedor de
              roupas, office boy e até locutor infantil em rádio. Ao longo da minha vida, passei por inúmeras
              dificuldades
              e adversidades, mas mesmo assim, fui ousado e corajoso o suficiente para criar vários empreendimentos,
              que,
              infelizmente, por não ter na época, uma instituição como a que estamos fundando hoje para me orientar,
              fracassei em muito deles. Mas, posteriormente, graças a educação, ao trabalho, a resiliência e ao
              empreendedorismo também consegui criar vários empreendimentos de muito sucesso. Logo, aprendi, a duras
              penas
              o caminho do empreendedorismo, e agora quero poder ensinar os jovens, especialmente os de escolas
              públicas,
              a não passar pelo que passei.
            </div>

            <div class="mb-1">
              <span class="font-weight-bold">- Caros amigos empreendedores</span>
            </div>
            <div class="mb-2">
              - Vivemos em um continente rico em direitos minerais, áreas portuárias e territoriais,
              população jovem e trabalhadora. Apesar disso, estamos assolados pela fome, não só pela fome de alimento,
              mas, principalmente, pela fome de esperança. A esperança foi sendo consumida pela corrupção, desigualdade
              social, violência e desemprego.
            </div>

            <div class="mb-2">
              - Aqui, muito tem se falado sobre a necessidade de incentivar o empreendedorismo e de
              auxiliar a formação de nossos jovens empreendedores. Porém, salvo honrosas exceções, pouco tem sido feito
              a
              esse respeito. A importância de incentivar e estimular o espírito e o dom empreendedor dos jovens
              brasileiros e da América Latina é indiscutível, pois, nenhuma nação do mundo pode crescer sem contar com a
              força empreendedora de seu povo. Do contrário, corre-se o risco de se sucumbir à “síndrome do gigante
              adormecido”, aquele que, “deitado eternamente em berço esplêndido”, está sempre à espera de um despertar
              que
              nunca ocorre, de uma mudança que nunca vem, de um milagre que nunca se realiza, enfim, de tudo o que
              representa a própria antítese do espírito empreendedor.
            </div>

            <div class="mb-2">
              - Partindo dessa premissa, apresento a vocês, nesta noite, a
              <span
                class="font-weight-bold"
              >materialização</span> do
              <span class="font-weight-bold">
                Instituto
                Latino-Americano de Empreendedorismo, Inovação e Desenvolvimento Sustentável – Instituto Êxito
              </span>.
              Uma
              iniciativa de 34 empreendedores visionários, imbuídos de um propósito maior, qual seja, o de estimular o
              dom
              empreendedor dos jovens carentes e apoiar o empreendedorismo, a livre iniciativa e a ética nos negócios.
            </div>

            <div class="mb-2">
              - Aqui quero registrar que
              <span class="font-weight-bold">empreendedor</span> na visão do
              <span class="font-weight-bold">Instituto Êxito de Empreendedorismo</span> é todo aquele que
              <span
                class="font-weight-bold"
              >transforma pensamentos em ação e sonhos em realidade</span>, e se vale do poder
              de suas ideias e ações para modificar, para melhor, a realidade que o cerca. É que empreendedorismo não é
              apenas um conceito econômico, não consiste apenas criar empresas. Muito mais que isso, ele é
              <span
                class="font-weight-bold"
              >atitude e estado de espírito</span>, e consiste em produzir coisas e negócios,
              de
              forma criativa e inovadora, com o intuito de gerar utilidade e benefícios para o bem comum e para a
              sociedade.
            </div>

            <div class="mb-2">
              - Agora, cada um de nós, empreendedores aqui presentes, conhece bem as dificuldades para
              iniciar um empreendimento no brasil, pois empreender em nossa nação não é uma tarefa fácil, especialmente
              para aqueles que, assim como eu, estudaram em escolas públicas, não tiveram muitas oportunidades na vida e
              não vieram de uma família empreendedora. Mas, sobretudo, por ser ele um país
              <span
                class="font-weight-bold"
              >extremamente burocrático</span>, detentor de uma mão de obra altamente
              desqualificada, cobrador de uma das maiores cargas tributárias do planeta, implementador de uma das
              maiores
              taxas de juros do mundo e possuidor de um alto índice de corrupção.
            </div>

            <div class="mb-2">
              - Apesar disso, o nosso país possui um time de empreendedores que acredita no país e no
              potencial das pessoas, especialmente nos jovens. Nesse sentido, nós temos a consciência de que podemos
              contribuir com a troca de conhecimento e experiências para que os jovens se desenvolvam e descubram o
              “dom”
              empreendedor que existe dentro deles. E foi com base neste princípio que o
              <span
                class="font-weight-bold"
              >Instituto Êxito de Empreendedorismo</span> foi criado. Com a filosofia de que,
              independente da classe social e econômica, qualquer pessoa pode despertar o dom empreendedor que existe
              nele
              e transformar suas ideias em negócios bem-sucedidos, melhorando, assim, a realidade e a comunidade na qual
              vive. O instituto visa, ademais, ajudar no desenvolvimento pessoal e profissional de jovens carentes e
              estudantes de instituições de ensino públicas, de nível médio (escolas públicas) e universitário que
              tenham
              interesse em empreender, pois seus pilares são pautados na trabalhabilidade almejando gerar riqueza, renda
              e
              empregos para as pessoas e para o país.
            </div>

            <div class="mb-2">
              - Com efeito, o instituto atuará em âmbito nacional e, posteriormente, internacional, com
              a
              realização de centenas de cursos online gratuitos, congressos, seminários, palestras, debates,
              conferências,
              workshops, oficinas, reuniões, estudos, fóruns, hackathons, mentorias, entre outras coisas.
            </div>

            <div class="mb-2">
              - Nessa perspectiva, os programas de desenvolvimento pessoal e profissional do instituto
              serão voltados para um amplo público divididos por categorias: a
              <span
                class="font-weight-bold"
              >
                primeira
                categoria
              </span> é para aqueles jovens, especialmente de escolas públicas, que querem criar empresas e
              buscam uma forma de despertar seu próprio potencial para colocar suas ideias em prática; a
              <span
                class="font-weight-bold"
              >segunda categoria</span> engloba aqueles jovens que não pretendem criar
              empresas,
              mas, que pretendem ser empreendedores em suas atividades liberais, autônomas, etc., e precisam de
              qualificação; a
              <span
                class="font-weight-bold"
              >terceira categoria</span> reúne aqueles jovens que não
              pretendem criar empresas com fins lucrativos, mas, instituições sem fins lucrativos, oscips ou ongs, e
              buscam soluções para os diversos problemas sociais, ambientais, étnicos, culturais, etc., da região em que
              vive; a
              <span
                class="font-weight-bold"
              >quarta categoria</span> compreende aqueles jovens que não pretendem
              criar empresas, mas que querem atuar empreendedoramente, na qualidade de empregado ou prestador de
              serviços
              das empresas em que trabalham, ou seja, que almejam ser intraempreendedores; e a
              <span
                class="font-weight-bold"
              >quinta categoria</span> reúne aqueles que estão em processo de aprimoramento na
              profissão ou na arte de empreender, mas que necessitam se reciclar, se aperfeiçoar e renovar seus
              conhecimentos, estratégias e ideias.
            </div>

            <div class="mb-2">
              - Entre os diferencias do Instituto Êxito de empreendedorismo estão as ações de cunho
              social. Todo e qualquer participante de qualquer um dos nossos cursos, seminários ou qualquer atividade
              gratuita terá que dar uma contrapartida social. Exemplificando, o potencial empreendedor que for
              beneficiário com um módulo de um curso oferecido só poderá ter acesso ao segundo se comprovar que efetuou
              determinada atividade social ou humanitária, como plantar árvores, ajudar uma creche ou um asilo e assim
              por
              diante, criando uma grande rede de solidariedade humanitária e social intitulada de
              <span
                class="font-weight-bold"
              >Êxito Social</span>. Nosso propósito com isso, é criar uma grande corrente de
              do
              bem, e fazer com que os potenciais empreendedores percebam que eles próprios tem o poder em suas mãos de
              mudar a realidade que os cerca. E que, em vez de esperar por mudanças, eles próprios podem se transformar
              em
              agentes dessas mudanças. E todas essas mudanças terão como importantes fonte de inspiração, em primeiro
              lugar, a certeza de que o caminho do sucesso nos empreendimentos e na vida das pessoas é construído pela
              própria pessoa. Em segundo, como fonte de motivação, a vida e a trajetória dos empreendedores sócios e
              patronos do instituto êxito de empreendedorismo, pessoas que, pelo poder de suas ideias, pela força de seu
              trabalho e por seu espírito empreendedor, desafiaram o rumo da história, incorporando o sucesso nos
              processos e nos produtos empreendidos.
            </div>

            <div class="mb-1">
              <span class="font-weight-bold">Para finalizar, meus caros amigos,</span>
            </div>
            <div class="mb-2">
              Nessa longa jornada da vida, aprendi a agradecer a deus por todas as coisas. As lutas me
              ensinaram a ser forte. As dificuldades me ensinaram a ser grande. E em todos os momentos, deus me ensinou
              a
              viver. Aprendi que coisas boas acontecem quando nós agradecemos. Portanto, agradeço, em primeiro lugar, a
              deus, pela minha vida e pela oportunidade de, todos os dias, recomeçar. Em segundo lugar a minha mulher,
              meus filhos, meus pais e meus irmãos, pelo amor incondicional. Em terceiro lugar, a cada um de vocês,
              sócios-fundadores e estatutários do instituto êxito de empreendedorismo, que acreditaram, principalmente,
              em
              mim e no meu sonho. Que decidiram se unir a mim e dedicar-se a pensar cada detalhe do nosso instituto, e
              que
              decidiram encarar esse novo projeto com entusiasmo, para que juntos, possamos ajudar a mudar o brasil. Por
              fim, quero agradecer a cada um dos jovens que já estão nos procurando para se inscrever, participar e
              buscar
              informações sobre o instituto. Saibam que vocês são os atores principais que nos motivaram a idealizar e
              colocar em prática este grandioso projeto.
            </div>

            <div class="mb-1">
              - O Instituto Êxito foi criado não apenas para ensinar sobre como empreender com sucesso.
              Ele foi criado, sobretudo, para mudar vidas, histórias e destinos e para ajudar a mudar o Brasil e, quiçá,
              a
              América Latina. Nosso propósito transformador massivo consiste em, através do incentivo ao
              empreendedorismo,
              criar oportunidades para aqueles que acham que não tem oportunidades e isso será feito impactando um
              milhão
              de pessoas em cerca de 5 anos.
            </div>
            <div class="mb-1">Bem-vindos ao Instituto Êxito de empreendedorismo.</div>
            <div class="mb-1">Bem-vindos a uma nova era no empreendedorismo.</div>
            <div class="mb-1">Muito obrigado e que Deus abençoe a todos.</div>
            <div class="my-3 font-italic subheading">
              <span class="font-weight-bold">Janguiê Diniz</span>, presidente do
              Instituto Êxito
            </div>
          </v-content>
        </v-card-text>
      </v-card>
    </v-dialog> -->
    <!-- -->
    <!-- float button -->
    <!-- -->
    <!-- <v-btn class="ma-5" fab absolute bottom right>
      <v-icon>expand_more</v-icon>
    </v-btn> -->
  </v-container>
</template>

<script>
/* eslint-disable */
import '../main.css'
import Firebase from "../firebase";
import Media from "@dongido/vue-viaudio";
import { Carousel, Slide } from 'vue-carousel'
import ExitoInspirational from "../components/landing/Inspirational.vue";
// import ExitoNavigationDrawer from "../components/landing/Drawer.vue";
// import ExitoToolbar from "../components/landing/Toolbar.vue";
import { setTimeout } from "timers";
const nd = new Date();

const todayDate = `${nd.getFullYear()}-${("0" + (nd.getMonth() + 1)).slice(
  -2
)}-${("0" + nd.getDate()).slice(-2)}`;


export default {
  fiery: true,
  components: {
    'exito-inspirational': ExitoInspirational,
    // 'exito-navigation-drawer': ExitoNavigationDrawer,
    // 'exito-toolbar': ExitoToolbar,
    Carousel,
    Slide    
  },
  data() {
    return {
      player: null,   
      youtube: {
        // video: {
        //   ready: true,
        //   url: 'JOIZustr9Xs'
        // },
        video: this.$fiery(Firebase.firestore.collection('video').doc('streaming')),
        width: 700
      },
      snackbarProximosEventos: false,      
      dialogInscrevase: false,
      todayDate: todayDate,
      // events: this.$fiery(Firebase.firestore.collection('events'), {
      //   // where('date', '>=', '2019-06-02')
      //   // where('visible', '==', true).
      //   query: q => q.where('date', '>=', `${nd.getFullYear()}-${('0'+nd.getMonth()).slice(-2)}-${('0'+nd.getDay()).slice(-2)}`).where('visible', '==', true).orderBy('date', 'asc')
      // }),
      events: [],
      showAllEvents: false,
      loadingEvents: true,
      drawer: false,
      showMenu: false,
      openingSpeechDialog: false,      
      initContent: this.$fiery(
        Firebase.firestore.collection("content").doc("banner")
      ),
      banners: this.$fiery(Firebase.firestore.collection('banners'), {
        query: q=> q.where('visible', '==', true)
      }),
      aboutTopics: [
        {
          title: "Formação de empreendedores",
          icon: "static/icons/group.webp",
          text:
            "Nossos programas de desenvolvimento pessoal e profissional serão dirigidos a um público amplo, formado, principalmente, por jovens, mas não nos limitando a eles. O objetivo é gerar formas inovadoras de promoção de bem-estar social, procurando efetivamente ajudar a transformar para melhor a comunidade em que estamos inseridos."
        },
        {
          title: "Rede de apoio aos estudantes",
          icon: "static/icons/education.webp",
          text:
            "O objetivo primacial do Instituto é despertar o empreendedor que existe dentro de cada jovem, especialmente os alunos de instituições de ensino públicas, de nível médio e universitário. Para tanto, iremos criar uma rede de apoio em milhares de escolas e universidades públicas brasileiras envolvendo diretamente os diretores e professores, bem como os líderes de classe, objetivando fomentar um movimento nacional denominado “cidadão empreendedor”."
        },
        {
          title: "Cursos gratuitos",
          icon: "static/icons/hand.webp",
          text:
            "Cursos (online e presenciais), seminários, workshops, simpósios, congressos e palestras oferecidos pelo Instituto Êxito serão gratuitos. Todo e qualquer participante do INSTITUTO ÊXITO terá de oferecer uma contrapartida social cujo objetivo é formar uma grande corrente de solidariedade e sustentabilidade social e humanitária chamada de “Êxito Social”."
        },
        {
          title: "Apoio a acessibilidade",
          icon: "static/icons/social-care.webp",
          text:
            "O  INSTITUTO ÊXITO  criará grupos formados por grandes profissionais na área de acessibilidade universal para encontrar soluções que possam melhorar as condições de acesso das pessoas com necessidades especiais em todo e qualquer lugar, atividades e tecnologias assistivas, auxiliando no  desenvolvimento das suas competências e habilidades, resguardando o direito de ir e vir a todos os lugares que necessitar."
        }
      ],
      perPageCustom: [[1449, 6], [1402, 4], [786, 3], [590, 2], [512, 1]],
      contact: {
        name: "",
        mail: "",
        company: "",
        phone: "",
        msg: ""
      },
      snackbar: false,
      color: "#4caf50",
      members: this.$fiery(Firebase.firestore.collection("members"), {
        query: q => q.orderBy("order", "asc")
      }),
      news: this.$fiery(Firebase.firestore.collection("news"), {
        query: q => q.orderBy("date", "asc")
      }),
      messages: [
        {
          avatar: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
          name: "John Leider",
          title: "Welcome to Vuetify.js!",
          excerpt: "Thank you for joining our community..."
        },
        {
          color: "red",
          icon: "people",
          name: "Social",
          new: 1,
          total: 3,
          title: "Twitter"
        },
        {
          color: "teal",
          icon: "local_offer",
          name: "Promos",
          new: 2,
          total: 4,
          title: "Shop your way",
          exceprt: "New deals available, Join Today"
        }
      ],
      lorem:
        "Lorem ipsum dolor sit amet, at aliquam vivendum vel, everti delicatissimi cu eos. Dico iuvaret debitis mel an, et cum zril menandri. Eum in consul legimus accusam. Ea dico abhorreant duo, quo illum minimum incorrupte no, nostro voluptaria sea eu. Suas eligendi ius at, at nemore equidem est. Sed in error hendrerit, in consul constituam cum.",
    };
  },
  filters: {
    longDateFormat(date) {
      return new Date(date).toLocaleDateString();
    }
  },
  methods: {
    onResize () {
      if (window.innerWidth < 700) {
        this.youtube.width = 350        
      } else {
        this.youtube.width = 700
      }
    },
    ready (event) {
      console.log('ready')
      this.player = event.player
    },
    playing (event) {
      console.log('playing')
      // The player is playing a video.
    },
    startTransmission () {
      console.log('fodeu não')
      this.$vuetify.goTo('#streaming')
      // this.player.startVideo()
      // this.$router.push('streaming')
    },
    openSpeechDialog () {
      console.log(`opening dialog speech ${this.openingSpeechDialog}`)
      this.openingSpeechDialog = !this.openingSpeechDialog
      console.log(`opened ${this.openingSpeechDialog}`)
    },
    textTruncate(str) {
      if (str && str.length > 0) {
        const length = 90;
        const ending = "...";

        if (str.length > length) {
          return str.substring(0, length - ending.length) + ending;
        } else {
          return str;
        }
      } else {
        return "";
      }
    },    
    downloadCartilha() {
      var link = document.createElement("a")
      link.href =
        "https://firebasestorage.googleapis.com/v0/b/instituto-exito-a06b4.appspot.com/o/documents%2FCartilha_Instituto_Exito.pdf?alt=media&token=1212a10a-143c-4086-9046-025a65709ab6"
      link.target = "_blank"
      link.download = "CartilhaExitoPdf.pdf"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    downloadPortaria() {
      var link = document.createElement("a")
      link.href =
        "https://firebasestorage.googleapis.com/v0/b/instituto-exito-a06b4.appspot.com/o/documents%2FPORTARIA_001_DE_REGULAMENTA%C3%87%C3%83O_DOS.pdf?alt=media&token=f5dd26c5-bac2-4858-bd82-926e03833572"
      link.target = "_blank"
      link.download = "PortariaExito.pdf"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    downloadFolder() {
      var link = document.createElement("a")
      link.href =
        "https://firebasestorage.googleapis.com/v0/b/instituto-exito-a06b4.appspot.com/o/documents%2FFolder_Instituto_Exito.pdf?alt=media&token=d6bb4f73-be2f-4ccb-b25d-09350c5894b1"
      link.target = "_blank"
      link.download = "CartilhaExitoPdf.pdf"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    sendMessage() {
      const url =
        "https://script.google.com/macros/s/AKfycbxuYIkdFxWOPywLztmUhi3mtuy-GSk007sZN5D6-3mz2icbqZs/exec?" +
        "name=" +
        this.contact.name +
        "&mail=" +
        this.contact.mail +
        "&phone=" +
        this.contact.phone +
        "&company=" +
        this.contact.company +
        "&msg=" +
        this.contact.msg;
      const data = Object.assign(
        {},
        {
          name: this.contact.name,
          mail: this.contact.mail,
          phone: this.contact.phone,
          company: this.contact.company,
          msg: this.contact.msg
        }
      );
      fetch(url, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/x-www-form-urlencoded"
        }),
        mode: "cors",
        cache: "default"
      })
        .then(res => {
          this.snackbar = true;
        })
        .catch(err => {
          console.error(err);
        });
    },
    imgUrl(url) {
      return `background: url(${url});`;
    },
    getOnlyDate(input) {
      /** 
         * <span v-if="new Date(item.date).getDate() < 10">0</span>
                      {{ new Date(item.date).getDate()}} 
         */
      var parts = input.match(/(\d+)/g);
      // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
      var date = new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based
      if (date.getDate() < 10) {
        return 0 + date.getDate();
      } else {
        return date.getDate();
      }
    },
    async loadEvents() {
      console.log('started')
      let query
      this.loadingEvents = true
      if (this.showAllEvents) {
        query = q => q.where("active", "==", true)
            .where("visible", "==", true)
            .where("date", ">=", todayDate)
            .orderBy("date", "asc")
      } else {
        query = q => q.where("active", "==", true)
            .where("visible", "==", true)
            .where("date", ">=", todayDate)
            .orderBy("date", "asc")
            .limit(5)
      }
      self = this
      this.$fiery(Firebase.firestore.collection("events"), {
        query: query,
        onSuccess(events) {
          let self2 = self
          setTimeout(() => {
            self2.events = events
            self2.loadingEvents = false
            // console.log('ended', self.events, self2.events)
            self2.showAllEvents = !self2.showAllEvents
          }, 500)
        }
      });
    }
  },
  beforeDestroy () {    
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize, { passive: true })
    }
  },
  created() {
    console.log(todayDate);

    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })

    setTimeout(() => {
      this.snackbarProximosEventos = true;
    }, 3000);
    this.loadEvents()
  }
};
</script>

<style>

.blink_me {
  animation: blinker 2s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}

/*
roxo #4d57a6
laranja #f37b50
azul #3ec0ce
amarelo #fdcf09
*/

@font-face {
  font-family: "Helvetica-Text";
  src: url("../assets/fonts/Helvetica Now Text.otf");
}

@font-face {
  font-family: "Helvetiva-XBlack";
  src: url("../assets/fonts/Helvetica Now Display XBlack.otf");
}

@font-face {
  font-family: "Helvetica-Bold";
  src: url("../assets/fonts/Helvetica Now Display Bold.otf");
}

html {
  scroll-behavior: smooth;
  width: 100%;
}

body {
  width: 100%;
}

.container {
  font-family: "Helvetica-Text";
}

.btn {
  height: 40px;
  width: min-content;
  padding: 10px 15px;
  color: #fff;
  background-color: #3ec0ce;
  font-family: "Helvetica-Bold";
  cursor: pointer;
  text-align: center;
}

.btn a {
  text-decoration: none !important;
  color: #fff;
}

.navbar {
  position: fixed;
  z-index: 1;
  padding: 15px 10px !important;
}

.navIcon {
  background: url("../assets/logo-exito.webp");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #fff;
  height: 75px;
  width: 215px;
}

.navBtn {
  width: max-content;
  height: 40px;
  font-size: 1em;
  padding: 10px 18px;
  font-family: "Helvetica-Text";
  cursor: pointer;
}

.navBtn:hover {
  font-size: 1.1em;
}

.navBtn a {
  text-decoration: none;
  color: #828282;
}

.titleVideo {
  color: #3ec0ce;
  font-size: 3em;
  font-family: "Helvetica-Bold";
  padding: 30px 0;
}

.banner {
  height: 95vh;
  background: url("../../public/static/img/pexels-photo-1153213.webp");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
}

.bannerContent {
  height: min-content;
  padding: 30px 15px;
  color: #fff;
}

.bannerContent .title1 {
  font-family: "Helvetiva-XBlack";
  color: #4d57a6;
}

.bannerContent .title2 {
  font-family: "Helvetica-Bold";
}

.orangeOverlay {
  background-color: #f37b50ab;
}

.videoInst {
  padding: 10% 10% 5% 10%;
}

.about {
  color: #757474;
  padding: 5% 10% 5% 10%;
}

.genericTitle {
  font-family: "Helvetica-Bold";
  font-size: 2.5em;
  color: #4d57a6;
  margin: 20px 0;
}

.text-justify {
  text-align: justify;
  text-overflow: ellipsis;
}

.aboutContent {
  text-align: justify;
  font-family: "Helvetica-Text";
  font-size: 1.2em;
}

.aboutTopics {
  margin: 5% 10%;
  padding: 20px 20px;
  border: 1px solid #f37b50;
  font-family: "Helvetica-Text";
}

.purposeCard {
  height: 250px;
}

.purposeIcon {
  display: flex;
  justify-content: center;
  height: 25%;
}

.purposeIcon .icon {
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  height: 64px;
  width: 64px;
}

.purposeTitle {
  font-family: "Helvetica-Bold";
  display: flex;
  align-items: center;
  font-size: 1.5em;
  color: #4d57a6;
  height: 20%;
}

.purposeContent {
  text-align: justify;
  color: #757474;
  font-size: 0.9em;
  height: 55%;
}

.generic {
  margin: 5% 10%;
}

.genericContent {
  text-align: justify;
  font-family: "Helvetica-Text";
  color: #616060;
}

.listRow {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}

.team {
  color: #fff;
  background-color: #4d57a6;  
}

.memberImage {
  background-position: center !important;
  background-size: cover !important;
  background-repeat: no-repeat !important;
  border-radius: 50%;
  width: 230px;
  height: 230px;
}

.documents {
  padding: 4% 10%;
}

.docBoxClearFolder {
  width: 260px;
  height: 260px;
  border: 15px solid #7881cc;
  background-color: #666fb9;
  margin: 2% 4%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../../public/static/img/thumbs_clear_folder.webp");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  align-self: center;
}

.docBoxFolder {
  width: 260px;
  height: 260px;
  border: 15px solid #7881cc;
  background-color: #666fb9;
  margin: 2% 4%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../../public/static/img/thumbs_Folder.webp");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  align-self: center;
}

.docBoxCartilha {
  width: 260px;
  height: 260px;
  border: 15px solid #7881cc;
  background-color: #666fb9;
  margin: 2% 4%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../../public/static/img/Thumbs_Cartilha.webp");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  align-self: center;
}

.docBoxTitle {
  align-self: center;
  font-family: "Helvetica-Bold";
  font-size: 1.2em;
  color: #828282;
  margin: 10px 0;
}

.contact {
  background-color: #4d57a6;
  color: #fff;
  margin: 0;
  padding: 55px 0;
}

.v-text-field--outline
  > .v-input__control
  > .v-input__slot
  > .v-text-field__slot
  > label,
.v-text-field--outline
  > .v-input__control
  > .v-input__slot
  > .v-text-field__slot
  > input,
.v-text-field--outline
  > .v-input__control
  > .v-input__slot
  > .v-text-field__slot
  > textarea {
  color: #fff;
}

.footer {
  color: #616060 !important;
  font-family: "Helvetica-Text";
}

/* fade in animation */
@-webkit-keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(-7px);
  }

  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}

@-moz-keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(-7px);
  }

  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}

@-o-keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(-7px);
  }

  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(-7px);
  }

  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}

.fadeIn {
  -webkit-animation: fadeIn 3s ease-in-out;
  -moz-animation: fadeIn 3s ease-in-out;
  -o-animation: fadeIn 3s ease-in-out;
  animation: fadeIn 3s ease-in-out;
  animation-iteration-count: 1;
}

/* responsiveness */
@media (max-width: 450px) {
  .titleVideo {
    font-size: 2.5em;
  }
}

@media (max-width: 960px) {
  .aboutTopics {
    margin: 7% 10%;
  }

  .purposeCard {
    width: 100%;
    height: min-content;
  }

  .purposeIcon {
    height: auto;
  }

  .purposeTitle {
    height: auto;
  }

  .purposeContent {
    height: auto;
  }

  .VueCarousel-dot-container {
    display: hidden;
  }

  .generic {
    margin: 5% 5%;
  }
}

.width-100.layout.column > .flex {
  width: 96%;
}

.quill-text > p {
  margin-bottom: 0px;
}
</style>