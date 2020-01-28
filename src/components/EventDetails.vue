<template>
  <v-container pa-0 ma-0 class="minWidth container">
    <v-container pa-0 ma-0 class="minWidth">
      <v-toolbar color="white" class="navbar">
        <v-toolbar-title class="headline text-uppercase">
          <div class="navIcon"></div>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-layout justify-end row align-center class="hidden-md-and-down">
          <div class="navBtn"><a href="#sobre">Institucional</a></div>
          <div class="navBtn"><a href="#educacao">Plataforma de cursos</a></div>
          <!-- <div class="navBtn"><a href="#">Mídias</a></div> -->
          <div class="navBtn"><a href="http://linhadiretadigital.com.br/revistaempreenda/#/inicio/321"
              target="_blank">Revista Empreenda</a></div>
          <!-- <div class="navBtn"><a href="#">Depoimentos</a></div> -->
          <div class="navBtn"><a href="#membros">Sócios</a></div>
          <div class="navBtn"><a href="#desafios">Desafios</a></div>
          <div class="navBtn"><a href="#contato">Contato</a></div>
          <v-menu offset-y min-width="200px">
            <template v-slot:activator="{ on }">
              <div class="navBtn" v-on="on"><a href="#">Inscreva-se</a></div>
            </template>
            <v-list>
              <v-list-tile target="_blank"
                href="https://docs.google.com/forms/d/e/1FAIpQLSdNDN07du2LCsaCEJ_2VAF4wfWCHsDNUSufRrQmVnwG8BDpnQ/viewform?usp=sf_link">
                <v-list-tile-title>Seja sócio</v-list-tile-title>
              </v-list-tile>
              <v-list-tile target="_blank"
                href="https://docs.google.com/forms/d/e/1FAIpQLSfrJReVK-TFUxC6w-RZeMe5PYnniCDtj8zrPoqWY8E3WZ6qfA/viewform?usp=sf_link">
                <v-list-tile-title>Quero empreender</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-layout>
        <v-layout align-center justify-end row fill-height class="text-uppercase hidden-lg-and-up">
          <v-btn icon @click="drawer=true">
            <v-icon color="#828282">fas fa-bars</v-icon>
          </v-btn>
        </v-layout>

      </v-toolbar>
      <v-navigation-drawer v-model="drawer" color="#fff" app temporary>
        <div class="navIcon my-2 mx-3"></div>
        <v-list class="pt-0 list">
          <v-list-tile v-for="item in menu" :key="item.title" :href="item.target">
            <v-list-tile-content>
              <v-list-tile-title @click="clickedOnDrawer(item.target)">{{item.title}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
    </v-container>
    <v-container ma-0 pa-0 class="minWidth banner">
      <v-layout fill-height align-center class="orangeOverlay">
        <v-layout align-center class="bannerContent">
          <v-flex text-xs-center class="fadeIn">
            <div class="title1">Nosso propósito</div>
            <div class="title2">é fornecer oportunidade àqueles que procuram</div>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-container>
    <v-container class="minWidth videoInst">
      <v-layout justify-center row wrap>
        <v-flex sm12 md6>
          <v-layout py-4 px-1 fill-height column justify-center align-center>
            <div class="titleVideo">Somos todos empreendedores loucos!</div>
            <v-layout style="width: 100%;"><v-btn color="#f37b50" dark @click="speechDialog = true">DISCURSO DE LANÇAMENTO</v-btn></v-layout>
          </v-layout>
        </v-flex>
        <v-flex sm12 md6>
          <v-layout fill-height align-center>
            <div id="app">
              <Media
                :kind="'video'"
                :controls="true"
                :style="{width: '100%'}"
                :src="['https://firebasestorage.googleapis.com/v0/b/instituto-exito-a06b4.appspot.com/o/midia%2Fexito_video_lancamento.mp4?alt=media&token=5a5feb60-2505-474c-83e2-6f446139b37c']"
              >
              </Media>
            </div>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container id="sobre" pa-0 ma-0 class="minWidth">
      <v-layout column class="about">
        <v-layout class="genericTitle">Acreditamos no seu potencial para empreender</v-layout>
        <v-layout class="aboutContent">{{initContent.about_us}}</v-layout>
      </v-layout>
    </v-container>
    <v-container pa-0 ma-0 class="minWidth">
      <v-layout class="aboutTopics">
        <v-layout class="listRow">
          <v-flex md6 sm12 v-for="i in aboutTopics" :key="i.title">
            <v-layout column my-3 px-4 class="purposeCard">
              <div class="purposeIcon">
                <div :style='imgUrl(i.icon)' class="icon"></div>
              </div>
              <div class="purposeTitle"><span style="height: min-content;">{{i.title}}</span></div>
              <div class="purposeContent">
                {{i.text}}
              </div>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-container>
    <v-container>
      <span class="genericTitle"> Próximos eventos </span>
      <v-timeline>
        <v-timeline-item v-for="n in events" :key="n.title" color="#4d57a6" large>
          <template v-slot:opposite>
            <span>{{n.date | longDateFormat}}</span>
          </template>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-card class="elevation-2">
                <!--<v-img-->
                        <!--src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"-->
                        <!--height="200px"-->
                <!--&gt;-->
                <!--</v-img>-->
                <v-img
                        :src="((n.images || [0])[0] || {}).path"
                        height="200px"
                >
                </v-img>

                <v-card-title primary-title>
                  <div>
                    <div class="headline">{{n.title}}</div>
                    <!--<span class="grey&#45;&#45;text">1,000 miles of wonder</span>-->
                  </div>
                </v-card-title>

                <v-card-actions>
                  <div></div>
                  <!--<v-btn flat color="purple">DETALHES</v-btn>-->
                  <v-spacer></v-spacer>
                  <v-btn icon @click="show = !show">
                    <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                  </v-btn>
                </v-card-actions>

                <v-slide-y-transition>
                  <v-card-text v-show="show">
                    <span>{{n.date | longDateFormat}}</span>
                  </v-card-text>
                </v-slide-y-transition>
              </v-card>
            </v-flex>
          </v-layout>
        </v-timeline-item>
      </v-timeline>
    </v-container>
    <v-container px-0 id="educacao" class="minWidth">
      <v-layout class="generic">
        <v-flex md6 sm12 px-2>
          <v-img src="static/img/shutterstock_657257209.webp" height="100%" width="100%">
          </v-img>
        </v-flex>
        <v-flex md6 sm12 px-3>
          <v-layout align-center fill-height justify-center>
            <v-layout column>
              <div class="genericTitle">Nossa plataforma de cursos</div>
              <div class="genericContent">
                O <span class="font-weight-bold">INSTITUTO ÊXITO</span> disponibilizará uma ampla plataforma com cursos
                online,
                em sua maioria gratuitos. Nosso objetivo é ajudar os potenciais empreendedores
                de todos os públicos, principalmente alunos de escolas públicas, a adquirirem
                habilidades e competência para se desenvolverem pessoal e profissionalmente,
                especialmente, mas não se limitando, a aquisição da competência de geração de
                trabalhabilidade no sentido de criarem seus empreendimentos e gerarem riqueza,
                renda e emprego.
              </div>
              <div class="my-4">
                <span class="btn text-uppercase"><a href="https://www.toolzz.com.br/institutoexito"
                    target="_blank">Conheça</a></span>
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
      <v-layout align-center class="minWidth hidden-sm-and-down" style="margin: 60px 0 20px 0;">
        <carousel class="minWidth" :centerMode="true" :perPageCustom="perPageCustom" :autoplay="true"
          :autoplayTimeout="3100" :loop="true" paginationColor="#ffffffa1" paginationActiveColor="#ffffff">
          <slide v-for="member in members" :key="member['.uid']">
            <v-layout column align-center>
              <div :style='imgUrl(member.img_url)' class="memberImage"></div>
              <div class="headline font-weight-bold mt-3 mb-2">{{member.name}}</div>
              <div class="text-xs-center title">{{member.role}}</div>
            </v-layout>
          </slide>
        </carousel>
      </v-layout>
      <v-layout align-center class="minWidth hidden-md-and-up" style="margin: 60px 0 20px 0;">
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
      </v-layout>
    </v-container>
    <v-container id="desafios" px-0 class="minWidth">
      <v-layout class="generic">
        <v-flex md6 sm12 px-3>
          <v-layout align-center fill-height>
            <v-layout column>
              <div class="genericTitle">Nossos desafios</div>
              <div class="genericContent">
                O <span class="font-weight-bold">INSTITUTO ÊXITO</span> atuará na formação de novos empreendedores, bem
                como no aperfeiçoamento de
                quem já é empreendedor. A metodologia de trabalho a ser empregada pelo Instituto será construtiva,
                integrada, participativa e interdisciplinar, valorizando as abordagens quantitativa e qualitativa,
                na busca do formato em rede no sentido de criar áreas de interseção entre as diversas temáticas
                abordadas com o objetivo de construir conhecimento sobre empreendedorismo, articulando o saber e
                o fazer e evoluindo com a produção científica sobre os temas tratados.
              </div>
              <div class="my-4">
                <span class="btn text-uppercase">Conheça</span>
              </div>
            </v-layout>
          </v-layout>
        </v-flex>
        <v-flex md6 sm12 px-2>
          <v-img src="static/img/shutterstock_653550529.webp" height="100%" width="100%">
          </v-img>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container class="minWidth canvas"></v-container>
    <v-container class="minWidth ma-0 documents">
      <v-layout class="genericTitle">Nossos documentos</v-layout>
      <v-layout justify-center row wrap style="padding: 5% 0;">
        <v-layout column my-2>
          <div class="docBoxFolder"></div>
          <div class="docBoxTitle">Nosso Folder de Lançamento</div>
          <div style="align-self: center;">
            <v-btn color="#3ec0ce" dark @click="downloadFolder">DOWNLOAD</v-btn>
          </div>
        </v-layout>
        <v-layout column my-2>
          <div class="docBoxCartilha"></div>
          <div class="docBoxTitle">Cartilha do Instituto</div>
          <div style="align-self: center;">
            <v-btn color="#3ec0ce" dark @click="downloadCartilha">DOWNLOAD</v-btn>
          </div>
        </v-layout>
      </v-layout>
    </v-container>
    <v-container id="contato" px-0 class="minWidth contact">
      <v-layout py-4 justify-center class="font-weight-black display-2">
        <div>Fale conosco</div>
      </v-layout>
      <v-layout justify-center>
        <v-form class="contactForm">
          <v-text-field v-model="contact.name" background-color="#fff" label="Nome" required box></v-text-field>
          <v-text-field v-model="contact.mail" background-color="#fff" label="E-mail" box required></v-text-field>
          <v-text-field v-model="contact.phone" background-color="#fff" label="Telefone" box required
            mask="## # ####-####">
          </v-text-field>
          <v-text-field v-model="contact.company" background-color="#fff" box label="Empresa (Opcional)"></v-text-field>
          <v-textarea label="Mensagem" box v-model="contact.msg" background-color="#fff"></v-textarea>
          <v-btn @click="sendMessage()">Enviar</v-btn>
        </v-form>
      </v-layout>
      <v-snackbar v-model="snackbar" :color="color" :timeout="3000">
        E-mail enviado!
        <v-btn dark flat @click="snackbar = false">
          <v-icon>fas fa-times</v-icon>
        </v-btn>
      </v-snackbar>
    </v-container>
    <v-container pa-0 ma-0 class="minWidth">
      <v-footer height="auto">
        <v-card flat tile class="footer text-xs-center minWidth" color="#fff">
          <v-card-text>
            <v-btn class="mx-3" href="https://www.instagram.com/exito.instituto/" target="_blank" icon>
              <v-icon size="24px">fab fa-instagram</v-icon>
            </v-btn>
            <v-btn class="mx-3" href="https://www.linkedin.com/company/institutoexitodeempreendedorismo/about/"
              target="_blank" icon>
              <v-icon size="24px">fab fa-linkedin</v-icon>
            </v-btn>
          </v-card-text>

          <v-card-text class="pt-0">
            <v-layout justify-center>
              <div class="navIcon"></div>
            </v-layout>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-text>
            &copy;2019 — <strong>Êxito Instituto</strong>
          </v-card-text>
        </v-card>
      </v-footer>
    </v-container>
    <v-dialog v-model="dialogInscrevase" max-width="400px">
      <v-card>
        <v-card-text>
          Deseja ser um sócio do Instituto Êxito ou você deseja participar da experiência de ser um Empreendedor
          conosco?
        </v-card-text>
        <v-card-actions>
          <v-btn target="_blank"
            href="https://docs.google.com/forms/d/e/1FAIpQLSdNDN07du2LCsaCEJ_2VAF4wfWCHsDNUSufRrQmVnwG8BDpnQ/viewform?usp=sf_link">
            Seja sócio </v-btn>
          <v-spacer></v-spacer>
          <v-btn target="_blank"
            href="https://docs.google.com/forms/d/e/1FAIpQLSfrJReVK-TFUxC6w-RZeMe5PYnniCDtj8zrPoqWY8E3WZ6qfA/viewform?usp=sf_link">
            Quero empreender</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="speechDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="#4d57a6">
          <v-btn icon dark @click="speechDialog = false">
            <v-icon>fas fa-times</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-title primary-title>
          <div>
            <div class="headline">Discurso de lançamento do Instituto Êxito de Empreendedorismo</div>
            <span>22 de maio de 2019</span>
          </div>
        </v-card-title>
        <v-card-text>
          <div class="mb-1"><span class="font-weight-bold">Minhas senhoras e meus senhores.</span></div>
          <div class="mb-2">- Quero iniciar a minha fala registrando a imensa satisfação em estar na noite de hoje aqui com cada um de vocês para lançar este grandioso projeto de fomento ao empreendedorismo brasileiro e latino-americano.  Mais gratificante que isso é saber que inicialmente conseguimos juntar um time de 34 empreendedores visionários, que hoje já são mais de 100, que assim como eu, acreditam que é possível mudar o brasil a partir do talento e do <span class="font-weight-bold">dom empreendedor</span> dos nossos jovens e que a educação e o empreendedorismo são pilares fundamentais para fazer isto acontecer.</div>

          <div class="mb-2">- Imagino que todos vocês conhecem um pouco da minha história.  Venho de uma família de origem humilde. Nasci em uma cidadezinha chamada Santana dos Garrotes, no sertão paraibano e sempre estudei em escolas públicas. Sai de lá fugindo da seca e da fome e fui morar em Naviraí, no Mato Grosso do Sul, e posteriormente em Pimenta Bueno, estado de Rondônia. Aos 8 anos fui engraxate de rua, depois, vendedor de laranjas e de picolés de casa em casa. Dos 10 aos 14 anos de idade trabalhei como garçon, vendedor de roupas, office boy e até locutor infantil em rádio. Ao longo da minha vida, passei por inúmeras dificuldades e adversidades,  mas mesmo assim, fui ousado e corajoso o suficiente para criar  vários empreendimentos, que, infelizmente, por não ter na época,  uma instituição como a que estamos fundando hoje para me orientar, fracassei em muito deles. Mas, posteriormente, graças a educação, ao trabalho,  a resiliência e ao empreendedorismo também consegui criar  vários empreendimentos  de muito sucesso. Logo, aprendi, a duras penas o caminho do empreendedorismo, e agora quero poder ensinar os jovens, especialmente os de escolas públicas,  a não passar pelo que passei.</div>

          <div class="mb-1"><span class="font-weight-bold">- Caros amigos empreendedores</span></div>
          <div class="mb-2">- Vivemos em um continente rico em direitos minerais, áreas portuárias e territoriais, população jovem e trabalhadora. Apesar disso, estamos assolados pela fome, não só pela fome de alimento, mas, principalmente, pela fome de esperança. A esperança foi sendo consumida pela corrupção, desigualdade social, violência e desemprego.</div>

          <div class="mb-2">- Aqui, muito tem se falado sobre a necessidade de incentivar o empreendedorismo e de auxiliar a formação de nossos jovens  empreendedores. Porém, salvo honrosas exceções, pouco tem sido feito a esse respeito. A importância de incentivar e estimular o espírito e o dom  empreendedor dos jovens  brasileiros e da América Latina é indiscutível, pois,  nenhuma nação  do mundo pode crescer sem contar com a força empreendedora de seu povo. Do contrário, corre-se o risco de se sucumbir à “síndrome do gigante adormecido”, aquele que, “deitado eternamente em berço esplêndido”, está sempre à espera de um despertar que nunca ocorre, de uma mudança que nunca vem, de um milagre que nunca se realiza, enfim, de tudo o que representa a própria antítese do espírito empreendedor.</div>

          <div class="mb-2">- Partindo dessa premissa, apresento a vocês, nesta noite, a <span class="font-weight-bold">materialização</span>  do <span class="font-weight-bold">Instituto Latino-Americano de Empreendedorismo, Inovação e Desenvolvimento Sustentável – Instituto Êxito</span>. Uma iniciativa de 34 empreendedores visionários, imbuídos de um propósito  maior, qual seja, o de estimular o dom empreendedor dos jovens carentes e apoiar o empreendedorismo, a livre iniciativa e a ética nos negócios.</div>

          <div class="mb-2">- Aqui quero registrar que <span class="font-weight-bold">empreendedor</span> na visão do <span class="font-weight-bold">Instituto Êxito de Empreendedorismo</span> é todo aquele que <span class="font-weight-bold">transforma pensamentos em ação e sonhos em realidade</span>, e  se vale do poder de suas ideias e ações  para modificar, para melhor,  a realidade que o cerca. É que empreendedorismo não é apenas um conceito econômico, não consiste apenas criar empresas. Muito mais que isso, ele é <span class="font-weight-bold">atitude e  estado de espírito</span>, e consiste em produzir   coisas e negócios,   de forma criativa e inovadora,  com o intuito de gerar utilidade e benefícios para o bem comum e para a sociedade.</div>

          <div class="mb-2">- Agora, cada um de nós, empreendedores aqui presentes, conhece bem as dificuldades para iniciar um empreendimento no brasil, pois empreender em nossa nação não é uma tarefa fácil, especialmente  para aqueles que, assim como eu, estudaram em escolas públicas,  não tiveram muitas oportunidades na vida e não vieram de uma família empreendedora.  Mas, sobretudo, por ser ele um país <span class="font-weight-bold">extremamente burocrático</span>, detentor de uma  mão de obra altamente desqualificada, cobrador  de uma das maiores  cargas tributárias do planeta, implementador de  uma das maiores taxas de juros do mundo e possuidor de um  alto índice de  corrupção.</div>

          <div class="mb-2">- Apesar disso, o nosso  país  possui um time de empreendedores  que acredita no país e   no potencial das pessoas, especialmente nos jovens. Nesse sentido, nós temos a consciência de que  podemos contribuir com a troca de conhecimento e experiências para que os jovens se desenvolvam e descubram o “dom” empreendedor que existe dentro deles. E foi com base neste princípio  que  o <span class="font-weight-bold">Instituto Êxito de Empreendedorismo</span>  foi criado.  Com a filosofia de que, independente da classe social e econômica, qualquer pessoa pode despertar o dom empreendedor que existe nele  e  transformar suas ideias em negócios bem-sucedidos, melhorando, assim,  a realidade e a comunidade na qual vive. O instituto visa, ademais,  ajudar no desenvolvimento pessoal e profissional de jovens carentes e estudantes de instituições de ensino públicas, de nível médio (escolas públicas) e universitário que tenham interesse em empreender, pois    seus pilares são pautados na trabalhabilidade  almejando  gerar riqueza, renda e empregos para as pessoas e para o país.</div>

          <div class="mb-2">- Com efeito, o instituto atuará em âmbito nacional e, posteriormente, internacional, com a realização de centenas de cursos online gratuitos, congressos, seminários, palestras, debates, conferências, workshops, oficinas, reuniões, estudos, fóruns, hackathons, mentorias, entre outras coisas.</div>

          <div class="mb-2">- Nessa perspectiva, os programas de desenvolvimento pessoal e profissional do instituto serão voltados para um amplo público divididos por categorias: a <span class="font-weight-bold">primeira categoria</span> é para aqueles jovens, especialmente de escolas públicas, que querem criar empresas e buscam uma forma de despertar seu próprio potencial para colocar suas ideias em prática; a <span class="font-weight-bold">segunda categoria</span> engloba aqueles jovens que não pretendem criar empresas, mas, que pretendem ser empreendedores em suas atividades liberais, autônomas, etc., e precisam de qualificação; a <span class="font-weight-bold">terceira categoria</span> reúne aqueles jovens que não pretendem criar empresas com fins lucrativos, mas, instituições sem fins lucrativos, oscips ou ongs, e buscam soluções para os diversos problemas sociais, ambientais, étnicos, culturais, etc., da região em que vive; a <span class="font-weight-bold">quarta categoria</span> compreende aqueles jovens que não pretendem criar empresas, mas que querem  atuar empreendedoramente, na qualidade de empregado ou prestador de serviços das empresas em que trabalham, ou seja, que almejam  ser intraempreendedores; e  a <span class="font-weight-bold">quinta categoria</span> reúne aqueles que estão em processo de aprimoramento na profissão ou na arte de empreender, mas que necessitam se reciclar, se aperfeiçoar e renovar seus conhecimentos, estratégias e ideias.</div>

          <div class="mb-2">- Entre os diferencias do Instituto  Êxito de empreendedorismo estão as ações de cunho social. Todo e qualquer participante de qualquer um dos nossos cursos, seminários ou qualquer atividade gratuita terá que dar uma contrapartida social. Exemplificando, o potencial empreendedor que for beneficiário com um módulo de um curso oferecido só poderá ter acesso ao segundo se comprovar que efetuou determinada atividade social ou humanitária, como plantar árvores, ajudar uma creche ou um asilo e assim por diante, criando uma grande rede de solidariedade humanitária e social intitulada de <span class="font-weight-bold">Êxito Social</span>. Nosso propósito com isso,  é criar uma grande corrente de do bem, e  fazer com que os potenciais empreendedores percebam que eles  próprios tem o poder em suas mãos  de mudar a realidade que os cerca. E que, em vez de esperar por mudanças, eles próprios podem se transformar em  agentes dessas mudanças.  E  todas essas mudanças  terão   como importantes fonte de inspiração, em primeiro lugar,   a certeza de que o caminho do sucesso nos empreendimentos e na vida das pessoas  é construído pela própria pessoa.   Em segundo, como fonte de  motivação,  a vida e a trajetória dos empreendedores sócios e  patronos do instituto êxito de empreendedorismo, pessoas que, pelo poder de suas ideias, pela força de seu trabalho  e por seu espírito empreendedor, desafiaram o rumo da história, incorporando o sucesso nos processos e nos produtos empreendidos.</div>

          <div class="mb-1"><span class="font-weight-bold">Para finalizar, meus caros amigos,</span></div>
          <div class="mb-2">Nessa longa jornada da vida, aprendi a agradecer a deus por todas as coisas. As lutas me ensinaram a ser forte. As dificuldades me ensinaram a ser grande. E em todos os momentos, deus me ensinou a viver. Aprendi que coisas boas acontecem quando nós agradecemos. Portanto, agradeço, em primeiro lugar, a deus, pela minha vida e pela oportunidade de, todos os dias, recomeçar.  Em segundo lugar a minha mulher, meus filhos, meus pais e meus irmãos, pelo amor incondicional. Em terceiro lugar, a cada um de vocês, sócios-fundadores e estatutários do instituto êxito de empreendedorismo, que acreditaram, principalmente, em mim e no meu sonho. Que decidiram se unir a mim e dedicar-se a pensar cada detalhe do nosso instituto, e que decidiram encarar esse novo projeto com entusiasmo, para que juntos, possamos ajudar a mudar o brasil. Por fim, quero agradecer a cada um dos jovens que já estão nos procurando para se inscrever, participar e buscar informações sobre o instituto. Saibam que vocês são os atores principais  que nos motivaram a idealizar e colocar em prática este grandioso projeto.</div>

          <div class="mb-1">- O Instituto Êxito  foi criado não apenas para ensinar  sobre como empreender com sucesso. Ele foi criado, sobretudo, para mudar vidas, histórias e destinos e para ajudar a mudar o Brasil  e, quiçá, a América Latina.  Nosso propósito transformador massivo consiste em, através do incentivo ao empreendedorismo, criar oportunidades para aqueles que acham que não tem oportunidades e isso será feito impactando um milhão de pessoas em cerca de 5 anos.</div>
          <div class="mb-1">Bem-vindos ao Instituto Êxito de empreendedorismo.</div>
          <div class="mb-1">Bem-vindos a uma nova era no empreendedorismo.</div>
          <div class="mb-1">Muito obrigado e que Deus abençoe a todos.</div>
          <div class="my-3 font-italic subheading"><span class="font-weight-bold">Janguiê Diniz</span>, presidente do Instituto Êxito</div>

        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
/* eslint-disable */
  import Firebase from '../firebase'
  import Media from '@dongido/vue-viaudio'

  export default {
    fiery: true,
    data() {
      return {
        dialogInscrevase: false,
        events: this.$fiery(Firebase.firestore.collection('events'), {
          query: q => q.orderBy('date', 'asc')
        }),
        drawer: false,
        showMenu: false,
        speechDialog: false,
        menu: [{
            title: 'Institucional',
            target: '#sobre'
          },
          {
            title: 'Plataforma de cursos',
            target: '#educacao'
          },
          /*  {
             title: 'Mídias',
             target: '#'
           }, */
          {
            title: 'Revista Empreenda',
            target: 'http://linhadiretadigital.com.br/revistaempreenda/#/inicio/321'
          },
          /* {
            title: 'Depoimentos',
            target: '#'
          }, */
          {
            title: 'Sócios',
            target: '#membros'
          },
          /* {
            title: 'Desafios',
            target: '#desafios'
          }, */
          {
            title: 'Contato',
            target: '#contato'
          },
          {
            title: 'Inscreva-se',
            target: '#inscreva-se',
          }
        ],
        initContent: this.$fiery(Firebase.firestore.collection('content').doc('banner')),
        aboutTopics: [{
            title: 'Formação de empreendedores',
            icon: 'static/icons/group.webp',
            text: 'Nossos programas de desenvolvimento pessoal e profissional serão dirigidos a um público amplo, formado, principalmente, por jovens, mas não nos limitando a eles. O objetivo é gerar formas inovadoras de promoção de bem-estar social, procurando efetivamente ajudar a transformar para melhor a comunidade em que estamos inseridos.'
          },
          {
            title: 'Rede de apoio aos estudantes',
            icon: 'static/icons/education.webp',
            text: 'O objetivo primacial do Instituto é despertar o empreendedor que existe dentro de cada jovem, especialmente os alunos de instituições de ensino públicas, de nível médio e universitário. Para tanto, iremos criar uma rede de apoio em milhares de escolas e universidades públicas brasileiras envolvendo diretamente os diretores e professores, bem como os líderes de classe, objetivando fomentar um movimento nacional denominado “cidadão empreendedor”.'
          },
          {
            title: 'Cursos gratuitos',
            icon: 'static/icons/hand.webp',
            text: 'Grande parte dos cursos (online e presenciais) seminários, workshops, simpósios, congressos e palestras oferecidos pelo Instituto Êxito serão gratuitos. Todo e qualquer participante do INSTITUTO ÊXITO terá de oferecer uma contrapartida social cujo objetivo é formar uma grande corrente de solidariedade e sustentabilidade social e humanitária chamada de “Êxito Social”.'
          },
          {
            title: 'Apoio a acessibilidade',
            icon: 'static/icons/social-care.webp',
            text: 'O  INSTITUTO ÊXITO  criará grupos formados por grandes profissionais na área de acessibilidade universal para encontrar soluções que possam melhorar as condições de acesso das pessoas com necessidades especiais em todo e qualquer lugar, atividades e tecnologias assistivas, auxiliando no  desenvolvimento das suas competências e habilidades, resguardando o direito de ir e vir a todos os lugares que necessitar.'
          }
        ],
        perPageCustom: [
          [1449, 6],
          [1402, 4],
          [786, 3],
          [590, 2],
          [512, 1]
        ],
        contact: {
          name: '',
          mail: '',
          company: '',
          phone: '',
          msg: ''
        },
        snackbar: false,
        color: '#4caf50',
        members: this.$fiery(Firebase.firestore.collection('members'), {
          query: q => q.orderBy('order', 'asc')
        })
      }
    },
    filters: {
      longDateFormat(date) {
        return new Date(date).toLocaleDateString()
      }
    },
    methods: {
      clickedOnDrawer(str) {
        this.drawer = false
        if (str === '#inscreva-se') {
          this.dialogInscrevase = true
        }
      },
      downloadCartilha() {
        var link = document.createElement('a');
        link.href =
          'https://firebasestorage.googleapis.com/v0/b/instituto-exito-a06b4.appspot.com/o/documents%2FCartilha_Instituto_Exito.pdf?alt=media&token=1212a10a-143c-4086-9046-025a65709ab6';
        link.target = '_blank';
        link.download = 'CartilhaExitoPdf.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      downloadFolder() {

        var link = document.createElement('a');
        link.href =
          'https://firebasestorage.googleapis.com/v0/b/instituto-exito-a06b4.appspot.com/o/documents%2FFolder_Instituto_Exito.pdf?alt=media&token=d6bb4f73-be2f-4ccb-b25d-09350c5894b1';
        link.target = '_blank';
        link.download = 'CartilhaExitoPdf.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // var storage = Firebase.firebase.storage()
        // // var pathReference = storage.ref('documents/Folder_Instituto_Exito.pdf.pdf')
        // 
        // var gsReference = storage.refFromURL('https://firebasestorage.googleapis.com/v0/b/instituto-exito-a06b4.appspot.com/o/documents%2FCartilha_Instituto_Exito.pdf?alt=media&token=1212a10a-143c-4086-9046-025a65709ab6')
        // .getDownloadURL().then(function(url) {
        // `url` is the download URL for 'documents/Folder_Instituto_Exito.pdf.pdf'
        // This can be downloaded directly:
        // var xhr = new XMLHttpRequest()
        // xhr.responseType = 'blob'
        // xhr.onload = function(event) {
        //   var blob = xhr.response;
        // }
        // xhr.open('GET', 'https://firebasestorage.googleapis.com/v0/b/instituto-exito-a06b4.appspot.com/o/documents%2FCartilha_Instituto_Exito.pdf?alt=media&token=1212a10a-143c-4086-9046-025a65709ab6')
        // xhr.send()
        // }).catch(function(error) {
        //   // Handle any errors
        //   console.log('failed')
        // })
      },
      sendMessage() {
        const url =
          'https://script.google.com/macros/s/AKfycbxhMzj-zcvkRZKtYHU1Czj-FeB_fPex5V4cxGkbpTSY7L5B_lKX/exec?' +
          'name=' + this.contact.name +
          '&mail=' + this.contact.mail +
          '&phone=' + this.contact.phone +
          '&company=' + this.contact.company +
          '&msg=' + this.contact.msg
        const data = Object.assign({}, {
          name: this.contact.name,
          mail: this.contact.mail,
          phone: this.contact.phone,
          company: this.contact.company,
          msg: this.contact.msg
        })
        fetch(url, {
          method: 'GET',
          headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
          }),
          mode: 'cors',
          cache: 'default'
        }).then((res) => {
          this.snackbar = true
        }).catch((err) => {
          console.error(err)
        })
      },
      imgUrl(url) {
        return `background: url(${url});`
      }
    }
  }
</script>

<style>
  /*
roxo #4d57a6
laranja #f37b50
azul #3ec0ce
amarelo #fdcf09
*/

  @font-face {
    font-family: 'Helvetica-Text';
    src: url('../assets/fonts/Helvetica Now Text.otf');
  }

  @font-face {
    font-family: 'Helvetiva-XBlack';
    src: url('../assets/fonts/Helvetica Now Display XBlack.otf');
  }

  @font-face {
    font-family: 'Helvetica-Bold';
    src: url('../assets/fonts/Helvetica Now Display Bold.otf');
  }

  html {
    scroll-behavior: smooth;
    width: 100%;
  }

  body {
    width: 100%;
  }

  .container {
    font-family: 'Helvetica-Text';
  }

  .btn {
    height: 40px;
    width: min-content;
    padding: 10px 15px;
    color: #fff;
    background-color: #3ec0ce;
    font-family: 'Helvetica-Bold';
    cursor: pointer;
    text-align: center
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
    background: url('../assets/logo-exito.webp');
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
    font-family: 'Helvetica-Text';
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
    font-family: 'Helvetica-Bold';
    padding: 30px 0;
  }

  .minWidth {
    min-width: 100%
  }

  .banner {
    height: 95vh;
    background: url('../../public/static/img/pexels-reduced.webp');
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
    font-family: 'Helvetiva-XBlack';
    font-size: 3.4em;
    color: #4d57a6;
  }

  .bannerContent .title2 {
    font-family: 'Helvetica-Bold';
    font-size: 3.4em;
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
    font-family: 'Helvetica-Bold';
    font-size: 2.5em;
    color: #4d57a6;
    margin: 20px 0;
  }

  .aboutContent {
    text-align: justify;
    font-family: 'Helvetica-Text';
    font-size: 1.2em;
  }

  .aboutTopics {
    margin: 5% 6%;
    padding: 20px 20px;
    border: 1px solid #f37b50;
    font-family: 'Helvetica-Text';
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
    font-family: 'Helvetica-Bold';
    display: flex;
    align-items: center;
    font-size: 1.5em;
    color: #4d57a6;
    height: 20%;
  }

  .purposeContent {
    text-align: justify;
    color: #757474;
    font-size: .9em;
    height: 55%;
  }

  .generic {
    margin: 5% 10%;
  }

  .genericContent {
    text-align: justify;
    font-family: 'Helvetica-Text';
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
    margin: 6% 0;
  }

  .memberImage {
    background-position: center !important;
    background-size: cover !important;
    background-repeat: no-repeat !important;
    border-radius: 50%;
    width: 230px;
    height: 230px;
  }

  .canvas {
    margin: 60px 0 0 0;
    background: url('../../public/static/img/Canvas.webp');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    height: 58vh;
  }

  .documents {
    padding: 4% 10%;
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
    background: url('../../public/static/img/thumbs_Folder.webp');
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
    background: url('../../public/static/img/Thumbs_Cartilha.webp');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    align-self: center;
  }

  .docBoxTitle {
    align-self: center;
    font-family: 'Helvetica-Bold';
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

  .contactForm {
    width: 65%;
  }

  .footer {
    color: #616060 !important;
    font-family: 'Helvetica-Text'
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
</style>