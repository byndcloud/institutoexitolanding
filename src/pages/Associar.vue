<template lang="pug">
  v-container(gridlist-xs)
    v-layout(row wrap)
      v-flex(xs12)
        v-card
          v-card-title.title Registrar sócio
          v-card-text
            v-btn(@click="registerAll") cadastrar todos
</template>

<script>
import firebase from '../firebase.js'
import { setTimeout } from 'timers'
// import pagarme from 'pagarme/browser'

var socios = [
  { name: 'ADRIANO CANTADEIRO ', func: 'SOCIO CONSULTIVO', email: 'DIRETORIA@MARKANTI.COM.BR', fone: '16-99105-0686' },
  { name: 'ADRIANO LISBOA DE AZEVEDO', func: 'SOCIO HONORARIO', email: 'ADRIANO.AZEVEDO@SEREDUCACIONAL.COM', fone: '81 99961 1068' },
  { name: 'ADRIANO OLIVEIRA DOS SANTOS', func: 'SOCIO CONSULTIVO', email: 'ADRIANOPOLITICA@UOL.COM.BR', fone: '81 99622 3730' },
  { name: 'AFRANIO PEREIRA', func: 'SOCIO CONSULTIVO', email: 'AFRANIOPEREIRA@SANTANDER.COM.BR / PEREIRA.AFRANIO@GMAIL.COM', fone: '11 99943 7942' },
  { name: 'ALAN RAMOS', func: 'SOCIO CONSULTIVO', email: 'ALAN.RAMOS@AZAPFRANQUIAS.COM', fone: '11 97015 7338' },
  { name: 'ALFREDO CARLOS BERTELLI SOARES\nCIA BRASILEIRA DE TECNOLOGIA P/ ECOMMERCE', func: 'SOCIO FUNDADOR', email: 'MARCELE.ALLAN@VTEX.COM.BR', fone: '21 99986 7508' },
  { name: 'AMERICO COUTO COELHO BEZERRA ', func: 'SOCIO CONSULTIVO', email: 'AMERICO_COUTO@HOTMAIL.COM', fone: '81-99921-1613' },
  { name: 'ANA CAROLINA PAIFER', func: 'SOCIO FUNDADOR', email: 'CAROL@ATOMPAR.COM.BR / FINANCEIRO@ATOMPAR.COM.BR', fone: '15-9-9835-8505' },
  { name: 'ANA PAULA ALEXANDRE TEMPORIN', func: 'SOCIO ESTATUTARIO', email: 'ANA@EDULABZZ.COM.BR', fone: '11-9-7456-2553' },
  { name: 'ANDERSON MARIO MARQUES DA ROCHA', func: 'SOCIO FUNDADOR', email: 'ANDERSON@ROCHAEAMARAL.COM.BR', fone: '85-98878-7354' },
  { name: 'ANDRAS MESICS ', func: 'SOCIO CONSULTIVO', email: 'ANDRAS.MESICS@ICLOUD.COM', fone: '11-9-4784-9065' },
  { name: 'ANDRE BORGES ', func: 'SOCIO ESTATUTARIO', email: 'ANDRE.BORGES@DREAMSSHAPER.COM', fone: '11-9-6020-7712' },
  { name: 'ANDRE CAPISTRANO EMRICH', func: 'SOCIO FUNDADOR', email: 'ANDRE@FIRCAPITAL.COM', fone: '31-9-9971-7877' },
  { name: 'ANDRE DOURADO ', func: 'SOCIO CONSULTIVO', email: 'ANDREDOURADO@LITIGIOCOBRANCAS.COM.BR', fone: '81-9-9746-5243' },
  { name: 'ANDRE FELIPPE FALBO FERREIRA', func: 'SOCIO CONSULTIVO', email: 'PAMPAGOLD@GMAIL.COM', fone: '21-9-9809-1212' },
  { name: 'ANDRE MAINART ', func: 'SOCIO CONSULTIVO', email: 'A.MAINART@GMAIL.COM', fone: '11-9-6107-6077' },
  { name: 'ANDRE PALIS', func: 'SOCIO FUNDADOR', email: 'ANDRE@RACCOON.AG', fone: '11- 9-8244-7631      ' },
  { name: 'ANTONIO CARBONARI NETTO', func: 'SOCIO FUNDADOR', email: 'CARBONARI@UOL.COM.BR', fone: '19-9-8901-5533' },
  { name: 'ANTONIO WALDIR BEZERRA TEXEIRA', func: 'SOCIO CONSULTIVO', email: 'DRTEIXEIRA@YAHOO.COM.BR', fone: '61-98309-1525' },
  { name: 'ARNALDO XAVIER ALVES DA ROCHA', func: 'SOCIO FUNDADOR', email: 'ARNALDOXAVIER1@YAHOO.COM.BR', fone: '81-9-9891-0093' },
  { name: 'ARTHUR SPERANDEO DE MACEDO (ROQUETE FILHO)', func: 'SOCIO CONSULTIVO', email: 'ARTHUR@ANACEU.ORG.BR\nARTHUR@ASDEMACEDO.COM\nFABIOLA@ANACEU.ORG.BR', fone: '11-2495-3134/11-9-4164-7996' },
  { name: 'BERNARDO BUOSI FADIGA', func: 'SOCIO ESTATUTARIO', email: 'BERNARDO@FMPERSONALISSIMO.COM.BR', fone: '19-9-9207-0621' },
  { name: 'BRUNO GUEDES PEREIRA', func: 'SOCIO FUNDADOR', email: 'BG@IRONCAPITAL.COM.BR ', fone: '11-9-8467-0017' },
  { name: 'BRUNO NOGUEIRA PINHEIRO ', func: 'SOCIO FUNDADOR', email: 'BRUNO@BRUNOPINHEIRO.ME', fone: '11-9-8227-0069' },
  { name: 'CANDIDO PINHEIRO KOREN DE LIMA JUNIOR', func: 'SOCIO FUNDADOR', email: 'CANDIDOJ@HAPVIDA.COM.BR\nPALOMAM@HAPVIDA.COM.BR', fone: '11-98972-4445' },
  { name: 'CARLOS - PURAVIDA ', func: 'SOCIO ESTATUTARIO', email: '', fone: '' },
  { name: 'CELSO NISKIER', func: 'SOCIO FUNDADOR', email: 'CNISKIER@UNICARIOCA.EDU.BR / RCUNHA@UNICARIOCA.EDU.BR', fone: '21-9-8566-2730' },
  { name: 'CHAIM ZAHER', func: 'SOCIO FUNDADOR', email: 'CHAIM.ZAHER@SEBSA.COM.BR', fone: '16-9-9786-6889' },
  { name: 'CLAUDIO HENRIQUE DO VALE VIEIRA', func: 'SOCIO FUNDADOR', email: 'CLAUDIOVALE@CVPAR.COM.BR', fone: '11-9-7578-2828' },
  { name: 'CLAUDIO MOURA LACERDA DE MELO', func: 'SOCIO CONSULTIVO', email: 'CMLACERDA1@HOTMAIL.COM', fone: '81-9-9971-5515' },
  { name: 'CLAUDIO ROBERTO DE CASTRO PESSOA DE MELO ', func: 'SOCIO FUNDADOR', email: 'CLAUDIO@ENSINARTECNOLOGIA.COM.BR', fone: '81-9-9126-8381' },
  { name: 'CUSTODIO FILIPE DE JESUS PEREIRA ', func: 'SOCIO CONSULTIVO', email: 'BRCUSTODIO@GMAIL.COM', fone: '11-98311-4848' },
  { name: 'DANIEL CAVALCANTE SILVA ', func: 'SOCIO HONORARIO', email: 'DANIEL.CAVALCANTE@ADVCOVAC.COM.BR', fone: '61-8124-4651' },
  { name: 'DANIEL FACCINI CASTANHO ', func: 'SOCIO CONSULTIVO', email: 'DANIEL.CASTANHO@ANIMAEDUCACAO.COM.BR', fone: '11-9-8167-1092' },
  { name: 'DAYVISSON MARQUES DE LIMA', func: 'SOCIO CONSULTIVO', email: 'DAYVISSONMARQUES@HOTMAI.COM', fone: '81-997277828' },
  { name: 'DEBORA CAMPOS MILLER ', func: 'SOCIO ESTATUTARIO', email: 'DEBORA.MILLE@DORALICEDOCES.COM.BR', fone: '11-9-8905-9192' },
  { name: 'DEBORA CRISTINA BRETTAS ANDRADE GUERRA ', func: 'SOCIO CONSULTIVO', email: '', fone: '31-9-9196-7974' },
  { name: 'DEBORA DE OLIVEIRA URIZZI BERNARDI', func: 'SOCIO ESTATUTARIO', email: 'SERGIOCOSTA@AGECONSULTING.COM.BR', fone: '81-99972-6818' },
  { name: 'DELMAR RODRIGUES ', func: 'SOCIO CONSULTIVO', email: 'DSR@COMPACTA-ANGOLA.COM', fone: '81-996311205' },
  { name: 'DIEGO GIACOMOSSO VERGILIO ', func: 'SOCIO ESTATUTARIO', email: 'DIEGOGVERGILIO@GMAIL.COM', fone: '19-9-8177-7360' },
  { name: 'DINO LINCOLN FIGUEIROA SANTOS ', func: 'SOCIO HONORARIO', email: 'DINOLINCOLN@GMAIL.COM', fone: '84-8128-4838' },
  { name: 'DIOGO GARCIA BARBUDA CORREIA ', func: 'SOCIO HONORARIO', email: 'DIOGO.GARCIA@BR.EY.COM', fone: '11-9-8206-7707' },
  { name: 'DIOGO MARTINS GARCIA ', func: 'SOCIO ESTATUTARIO', email: 'DIOGO@INSTITUTODOCONHECIMENTO.COM.BR', fone: '15- 99692-1783' },
  { name: 'DOV GILVANCI LEVI NAJMAN SOUZA ', func: 'SOCIO CONSULTIVO', email: 'DOV@GENNESYS.COM', fone: '62-9-8113-1660' },
  { name: 'EDGAR LARRY ANDRADE SOARES', func: 'SOCIO CONSULTIVO', email: 'EDGARLARRY@GMAIL.COM', fone: '77-9-9925-9580' },
  { name: 'EDGAR SATO APARECIDO DE FREITAS UEDA', func: 'SOCIO FUNDADOR', email: 'UEDA@NEXIMOB.COM.BR', fone: '11-98201-1907' },
  { name: 'EDSON NORONHA ', func: 'SOCIO ESTATUTARIO', email: 'LUIZCOMUNICA@YAHOO.COM.BR', fone: '62-99219-4151' },
  { name: 'EDU BEZERRA ', func: 'SOCIO ESTATUTARIO', email: 'LEVI@BEYONDCLOUD.COM.BR', fone: '81- 9-8221-8886' },
  { name: 'EDUARDO ALCALAY', func: 'SOCIO CONSULTIVO', email: 'EDUARDO.ALCALAY@BAML.COM', fone: '11-99379-9145' },
  { name: 'EDUARDO CAVALCANTE ', func: 'SOCIO HONORARIO', email: 'REDACAO@LEIAJA.COM.BR', fone: '81-9-9139-8480' },
  { name: 'EDUARDO DE OLIVEIRA CARLOS DA SILVA ', func: 'SOCIO CONSULTIVO', email: '', fone: '83-9-9981-5788' },
  { name: 'EDUARDO MAIA MAGALHAES', func: 'SOCIO ESTATUTARIO', email: 'EDMMAGALHAES@GMAIL.COM', fone: '81 99194 5473' },
  { name: 'ELOI MARCOS DE OLIVEIRA LAGO', func: 'SOCIO HONORARIO', email: 'ELOI.LAGO@UNG.BR', fone: '11 97352 1891' },
  { name: 'ERIKA STANCOLOVICH VEIGA ', func: 'SOCIO ESTATUTARIO', email: 'JOAO@NECTARCRM.COM.BR', fone: '62-98189-0069' },
  { name: 'ERNESTO M. HABERKORN ', func: 'SOCIO CONSULTIVO', email: 'ERNESTO@ERPFLEX.COM.BR', fone: '11-9-4796-9902' },
  { name: 'FABIO EHRLICH', func: 'SOCIO HONORARIO', email: 'MANOELALVINO@HOMAIL.COM', fone: '81-9-9922-2493' },
  { name: 'FABIO FUGIHARA ', func: 'SOCIO ESTATUTARIO', email: 'MEUSUCESSOSP@GMAIL.COM', fone: '' },
  { name: 'FABIO HENRIQUE CACHO CASANOVA', func: 'SOCIO CONSULTIVO', email: '', fone: '81-9-9910-9935' },
  { name: 'FABIO JOSE SILVA COELHO ', func: 'SOCIO CONSULTIVO', email: '', fone: '11-98370-9331' },
  { name: 'FABIO NAGAMATSU - CONFRARIA ', func: 'SOCIO ESTATUTARIO', email: 'FELIPEHDL@HOTMAIL.COM', fone: '81-9-92320801' },
  { name: 'FELIPE BRAVO MACHADO DE ANDRADE', func: 'SOCIO CONSULTIVO', email: 'FELIPEBRAVOMACHADO@GMAIL.COM', fone: '81 99151 7475' },
  { name: 'FELIPE HAECKEL D AVILA ', func: 'SOCIO ESTATUTARIO', email: 'DINOLINCOLN@GMAIL.COM', fone: '84-8128-4838' },
  { name: 'FERNANDO ANTONIO PEREIRA BRAGA ', func: 'SOCIO HONORARIO', email: 'FRED@ESPECIALISTAEMVAREJO.COM.BR', fone: '31-9-9339-7616/31-9-9339-7616' },
  { name: 'FERNANDO ANTONIO ROCHA FIGUEIRAS ', func: 'SOCIO ESTATUTARIO', email: '', fone: '' },
  { name: 'FERNANDO SANTOS DANTAS', func: 'SOCIO ESTATUTARIO', email: 'FERDANTAS@GAMIL.COM / FERNANDO@PMOLAB.COM', fone: '61 99912 2553' },
  { name: 'FERNANDO SEABRA ', func: 'SOCIO CONSULTIVO', email: 'SEABRA@FERNANDOSEABRA.COM.BR', fone: '11-9-9971-0712' },
  { name: 'FLAVIO CESAR MAIA LUZ', func: 'SOCIO CONSULTIVO', email: 'FLAVIO@DOINGBUSINESS.COM.BR', fone: '11-9-8100-3399' },
  { name: 'FLORENCIO PONTE CABRAL JUNIOR', func: 'SOCIO ESTATUTARIO', email: 'MAGNO@EXPERIENCIADESUCESSO.COM.BR', fone: '11-9-8242-4770' },
  { name: 'FRANCISCO DE ASSIS SIMOES NUNES ', func: 'SOCIO ESTATUTARIO', email: '', fone: '' },
  { name: 'FREDERICO BARROSO PINHO (FRED PINHO) ', func: 'SOCIO ESTATUTARIO', email: 'HEBERTBOUZON@GMAIL.COM', fone: '71-9-9380-7121' },
  { name: 'FREDERICO VELOSO ROCHA - FRED ROCHA ', func: 'SOCIO ESTATUTARIO', email: 'BIOSUSTEN@GMAIL.COM', fone: '16-3946-5900' },
  { name: 'GABRIEL MARIO RODRIGUES ', func: 'SOCIO CONSULTIVO', email: 'GMR2@GAMARO.COM.BR', fone: '11-3847-3550/11-9-8199-5517' },
  { name: 'GERALDO ARISTIDES RUFINO', func: 'SOCIO FUNDADOR', email: 'GARUFINO@JRDIESEL.COM.BR', fone: '11-9-4310-1515' },
  { name: 'GUILHERME EDUARDO NOVARETTI(ADV. DE BRUNO PINHEIRO)', func: 'SOCIO ESTATUTARIO', email: 'TEO.VILELA@MAPEBEAR.COM.BR', fone: '82-98204-2008' },
  { name: 'GUILHERME MACHADO ', func: 'SOCIO CONSULTIVO', email: 'GUILHERMEMACHADO@DABR.COM.BR', fone: '61-9-9148-9720' },
  { name: 'GUSTAVO DA CRUZ CAETANO ', func: 'SOCIO FUNDADOR', email: 'GUSTAVO.CAETANO@GMAIL.COM', fone: '31-9-9864-4622' },
  { name: 'GUSTAVO KESSLER AYRES DE AZEVEDO', func: 'SOCIO CONSULTIVO', email: '', fone: '' },
  { name: 'HALIM NAGEM NETO ', func: 'SOCIO CONSULTIVO', email: 'HALIM@NAGEM.COM.BR', fone: '' },
  { name: 'HAROLDO NUNES', func: 'SOCIO ESTATUTARIO', email: '', fone: '11 94756 7118' },
  { name: 'HEBERT D EMELO BOUZON ', func: 'SOCIO ESTATUTARIO', email: 'PAULOROGERIO@VALEDODENDE.ORG', fone: '71-9-9166-5403' },
  { name: 'HENRIQUE DINIZ MASCARENHAS', func: 'SOCIO FUNDADOR', email: 'HENRIQUE@CRYPTOLANDS.IO', fone: '31-9-9951-1547' },
  { name: 'HENRIQUE RODRIGUES PINHEIRO SILVA', func: 'SOCIO ESTATUTARIO', email: 'HRPS83@GMAIL.COM', fone: '61 98122 6259' },
  { name: 'HERBERT STEIBERG ', func: 'SOCIO CONSULTIVO', email: 'MESA@CORPORATEGOVERNANCE.COM', fone: '11-9-8350-8888' },
  { name: 'IARA DE MORAES XAVIER BRAGA ', func: 'SOCIO CONSULTIVO', email: 'IARADEXAVIER08@GMAIL.COM', fone: '' },
  { name: 'INGRID RAFAELLE MACHADO BELTRAO', func: 'SOCIO ESTATUTARIO', email: 'LINDALIA.REIS@GMAIL.COM', fone: '21-9-8101-8601' },
  { name: 'IVANILDO FIGUEIREDO ANDRADE DE OLIVEIRA FILHO', func: 'SOCIO CONSULTIVO', email: 'IVANILDO@TABELIONATOFIGUEIREDO.COM.BR', fone: '81-9-9967-2230' },
  { name: 'JACQUELINE SCHARLE DE MARCO ', func: 'SOCIO HONORARIO', email: 'LEONARDOMACHADO@CONCEITOSIN.COM.BR', fone: '61-99185-0727' },
  { name: 'JANYO JANGUIE BEZERRA DINIZ', func: 'SOCIO FUNDADOR', email: 'JANYO@GMAIL.COM', fone: '81-9-9978-1100' },
  { name: 'JOALDO JANGUIE BEZERRA DINIZ', func: 'SOCIO CONSULTIVO', email: 'JOALDO@SEREDUCACIONAL.COM', fone: '81 99769 9898' },
  { name: 'JOAO ALBERICO PORTO DE AGUIAR', func: 'SOCIO ESTATUTARIO', email: 'JOAO.AGUIAR@SEREDUCACIONAL.COM', fone: '81 99978 4966' },
  { name: 'JOAO AUGUSTO MARTINS CAMPOS SILVA ', func: 'SOCIO ESTATUTARIO', email: 'FRANCISCO@FACFORM.COM.BR', fone: '81- 9-8889-5000' },
  { name: 'JOAO BOSCHILIA APPOLINARIO', func: 'SOCIO FUNDADOR', email: 'JAPPOLINARIO@POLISHOP.COM.BR', fone: '11 99121 7707' },
  { name: 'JOAO KEPPLER  BRAGA ', func: 'SOCIO FUNDADOR', email: 'KEPLER@JOAOKEPLER.COM.BR', fone: '82-9-9308-0020' },
  { name: 'JOAO MARCELO FURLAN ', func: 'SOCIO ESTATUTARIO', email: 'FEHRLICH@MULTIPICAPARTNERS.COM', fone: '21-98380-0000' },
  { name: 'JOSE ALBERTO DE SOUZA JUNIOR ', func: 'SOCIO CONSULTIVO', email: 'ALBERTO@GRUPOLIFEBRASIL.COM.BR\nKESLEY@MISSAOCOMUNICACAO.COM.BR', fone: '51-9-8115-8043' },
  { name: 'JOSE ANTONIO GUIMARAES LAVAREDA FILHO', func: 'SOCIO CONSULTIVO', email: 'ALAVAREDA@UOL.COM.BR', fone: '81-9-9172-5440' },
  { name: 'JOSE ANTONIO PEREIRA CONSTANTINO (ZE SP 97)', func: 'SOCIO CONSULTIVO', email: 'ZEANTONIO@97FM.COM.BR', fone: '11-9-8122-9797' },
  { name: 'JOSE JANGUIE BEZERRA DINIZ ', func: 'SOCIO FUNDADOR', email: 'JANGUIE@INSTITUTOEXITO.COM.BR', fone: '81-9-8171-8857' },
  { name: 'JOSE LIMA DE CARVALHO ROCHA ', func: 'SOCIO CONSULTIVO', email: 'JOSE.ROCHA@PX.COM.BR', fone: '' },
  { name: 'JOSE OLYMPIO DA VEIGA PEREIRA ', func: 'SOCIO CONSULTIVO', email: 'ZEOLYMPIO@GMAIL.COM', fone: '' },
  { name: 'JOSE ROBERTO COVAC ', func: 'SOCIO CONSULTIVO', email: 'JR.COVAC@ADVCVAC.COM.BR', fone: '11-0-9989-1266' },
  { name: 'JOSE ROBERTO PROVESI ', func: 'SOCIO ESTATUTARIO', email: 'FABIOFUGIHARA@GMAIL.COM', fone: '43- 9-9911-7878' },
  { name: 'JOSE WILSON DOS SANTOS', func: 'SOCIO FUNDADOR', email: 'AGES.WILSON@UNIAGES.EDU.BR', fone: '75-9-9977-9932' },
  { name: 'JULIANO PIMENTEL CORREA SANTOS', func: 'SOCIO ESTATUTARIO', email: 'JULIANOPIMENTELSANTOS@GMAIL.COM', fone: '27 98803 1910' },
  { name: 'KLEBER BORTOLETTO', func: 'SOCIO CONSULTIVO', email: '', fone: '81-9-7107-0566' },
  { name: 'LEANDRO CORREIA DA SIIVA', func: 'SOCIO ESTATUTARIO', email: '', fone: '81-9-9272-9246' },
  { name: 'LEANDRO GUEIROS MARCONDES', func: 'SOCIO FUNDADOR', email: 'LEANDRO.MARCONDES@EXPERIENCIADESUCESSO.COM.BR', fone: '44-7944-124100' },
  { name: 'LEONARDO FERNANDES MACHADO ', func: 'SOCIO ESTATUTARIO', email: 'MEZ@MEZSP.COM.BR', fone: '11-2538-8196/11-9-8313-3113' },
  { name: 'LEONARDO FREITAS ', func: 'SOCIO ESTATUTARIO', email: 'SILVANA@SICOMUNICACAO.COM.BR', fone: '11-3042-5641/11-9-7688-3624' },
  { name: 'LEONARDO HOKUMURA ', func: 'SOCIO ESTATUTARIO', email: 'NEGOCIOS@RAQUELDEOLIVEIRA.COM.BR/RAQUELDEOLIVEIRA@IG.COM.BR', fone: '11-9-8212-6422' },
  { name: 'LEONARDO SOLDON ', func: 'SOCIO ESTATUTARIO', email: 'MARIO.CAVALIERI@BBNK.COM.BR', fone: '21-9-9996-6443' },
  { name: 'LEVI BARROS NOBREGA ', func: 'SOCIO ESTATUTARIO', email: 'THIAGO@SISTEMABLOX.COM.BR', fone: '11-9-9955-9190' },
  { name: 'LICINIO DIAS FERREIRA FILHO ', func: 'SOCIO CONSULTIVO', email: '', fone: '81-9-9602-0882' },
  { name: 'LINDALIA SOFIA ROCHA MARTINS JUNQUEIRA REIS ', func: 'SOCIO ESTATUTARIO', email: 'MARCO@WITEC.COM.BR', fone: '11-3199-4151/11-9-9965-9655' },
  { name: 'LUCAS BUGES MORAES ', func: 'SOCIO CONSULTIVO', email: 'LUCAS@EDULABZZ.COM.BR', fone: '11-9-8350-7618' },
  { name: 'LUCIANA G P DETONI', func: 'SOCIO HONORARIO', email: 'CAROL@WITEC.COM.BR', fone: '13-9-8112-1261' },
  { name: 'LUCIANA PEREIRA GOMES BROWNE ', func: 'SOCIO CONSULTIVO', email: 'LUCIANABROWNE@BROWNE.COM.BR', fone: '81-9-9172-4247' },
  { name: 'LUIS HENRIQUE YAMAGUCHI ABDALLA ', func: 'SOCIO ESTATUTARIO', email: 'SAYON.MELISSA@GMAIL.COM', fone: '11-2309-8700/9-8612-7223' },
  { name: 'LUIZ ANTONIO VASCONCELOS', func: 'SOCIO FUNDADOR', email: 'EDITOR@NOVOSECULO.COM.BR', fone: '11-9-9973-4439' },
  { name: 'LUIZ AUGUSTO BARRETO NEN JUNIOR (GUTO)', func: 'SOCIO CONSULTIVO', email: 'GBARRET@SISTEMAOPINIAO.COM.BR', fone: '84-99419-1301' },
  { name: 'LUIZ AUGUSTO CORREA DE ARAUJO FIHO', func: 'SOCIO FUNDADOR', email: 'LUIZ@AGENCIAUM.AG', fone: '81-99133-0663' },
  { name: 'LUIZ AUGUSTO NOBREGA DE OLIVEIRA ', func: 'SOCIO CONSULTIVO', email: 'LUIZAUGUSTO@CLASSICHALL.COM.BR', fone: '81-9-9952-7111/98719-9698' },
  { name: 'LUIZ AUGUSTO PEREIRA ', func: 'SOCIO HONORARIO', email: 'LUIZCOMUNICA@YAHOO.COM.BR', fone: '62-99219-4151' },
  { name: 'LUIZ CARLOS DE OLIVEIRA ', func: 'SOCIO CONSULTIVO', email: 'LUIZBTV@HOTMAIL.COM', fone: '69-9-9984-3003' },
  { name: 'LUIZ CLAUDIO BINATO', func: 'SOCIO ESTATUTARIO', email: 'FLORENCIO.CABRAL@AUTOAVALIAR.COM', fone: '11-9-5087-7947' },
  { name: 'LUIZ OTAVIO DE MEIRA LINS ', func: 'SOCIO CONSULTIVO', email: 'LOML@GRML.COM.BR', fone: '81-9-9971-1144/3464-1000' },
  { name: 'MAGNO FIGUEIREDO AZEVEDO ', func: 'SOCIO ESTATUTARIO', email: 'NATHALIE.CORTES@SEREDUCACIONAL.COM', fone: '11-9-9900-6407' },
  { name: 'MANOEL ALVINO DE LIMA FILHO', func: 'SOCIO ESTATUTARIO', email: 'RODRIGO@TRUSTBR.COM', fone: '11-9-9971-9505' },
  { name: 'MARCELO CHERTO\nCHERTO CONSULTORIA EMPRESARIAL E INTERMEDIACAO DE NEGOCIO LTDA', func: 'SOCIO CONSULTIVO', email: 'MARCELO@CHERTO.COM.BR', fone: '11 99481 4718' },
  { name: 'MARCELO CHUCRE DA COSTA', func: 'SOCIO FUNDADOR', email: 'MARCELO@LINHADIRETA.COM.BR', fone: '31-99158-4906' },
  { name: 'MARCELO ZENGA NUNES DA SIVA', func: 'SOCIO CONSULTIVO', email: 'MARCELO.ZENGA@SOCIALBLOCKS.IO / ZENGA@OOMHZ.COM', fone: '21 98831 9339' },
  { name: 'MARCIO CLEIDIO DOS SANTOS SOBRINHO', func: 'SOCIO HONORARIO', email: 'MARCIOSANTOS@OCKTUS.COM.BR', fone: '11 94224 3198' },
  { name: 'MARCIO ROGERIO GIACOBELLI', func: 'SOCIO FUNDADOR', email: 'MARCIOGIACOBELLI@TERRA.COM.BR', fone: '19-9-9305-3808' },
  { name: 'MARCO  AURELIO PINTO FLORENCIO FILHO', func: 'SOCIO CONSULTIVO', email: 'MARCOAURELIO@FLORENCIOFILHO.COM.BR', fone: '11-9-8202-0042' },
  { name: 'MARCO BADIA', func: 'SOCIO ESTATUTARIO', email: 'GUILHERME@NOVATTI.COM.BR', fone: '11-9-8141-4851' },
  { name: 'MARCO LAGOA', func: 'SOCIO HONORARIO', email: 'MARCO@WITEC.COM.BR', fone: '11-3199-4151/11-9-9965-9655' },
  { name: 'MARCOS ROBERTO BEZERRA DE MELLO MOURA DUBEUX', func: 'SOCIO FUNDADOR', email: 'MRD@POLICONBR.COM', fone: '81-9-9172-9072' },
  { name: 'MARCOS VALERIO PROTA DE ALENCAR BEZERRA ', func: 'SOCIO CONSULTIVO', email: 'MARCOS@DEJURE.COM.BR', fone: '9-8844-3434' },
  { name: 'MARIA CAROLINA GARDINI LAGOA ', func: 'SOCIO ESTATUTARIO', email: 'FERNANDO@PROVENTUSPROMOCOES.COM.BR', fone: '81-9-91755188' },
  { name: 'MARIO MARQUES CAVALIERE ', func: 'SOCIO ESTATUTARIO', email: 'LUIS.ABDALLA@SEJATRAINEE.COM.BR;SEJATRAINEE.COM.BR', fone: '11-9-8444-3240/11-3938-4000' },
  { name: 'MARIO OSMAR SPANIOL', func: 'SOCIO FUNDADOR', email: 'DIRETORIA@CARMENSTEFFENS.COM.BR', fone: '16-9-9209-9976' },
  { name: 'MAURICIO GRANDI ', func: 'SOCIO ESTATUTARIO', email: 'JOAO.FURLAN@ENORA.COM.BR', fone: '11-9-9620-1223' },
  { name: 'MAURO MOREIRA DE OLIVEIRA FREITAS ', func: 'SOCIO ESTATUTARIO', email: 'MARCO@NNATHO.COM.BR', fone: '11-9-4998-0782' },
  { name: 'MAURO ROBERTO BARRETO VIEIRA DE MELO', func: 'SOCIO ESTATUTARIO', email: 'MAURO.MELO@SEREDUCACIONAL.COM', fone: '81 98823 6063' },
  { name: 'MAURO SCHNAIDMAN', func: 'SOCIO CONSULTIVO', email: 'MSCHNAIDMAN@GMAIL.COM', fone: '1 (805) 341-1343' },
  { name: 'MAURO VICENTIN', func: 'SOCIO HONORARIO', email: 'MAURO@PERCREARE.COM.BR', fone: '11 96687 0505' },
  { name: 'MELISSA MALUF SAYON', func: 'SOCIO ESTATUTARIO', email: 'LEANDRO@LABINOVA.CM.BR', fone: '11 94786 7248' },
  { name: 'MIGUEL QUEIMADO ', func: 'SOCIO ESTATUTARIO', email: 'DEBORA@CONVOCACOES.COMBR', fone: '11-9-7382-2566' },
  { name: 'MURILO GUN ', func: 'SOCIO CONSULTIVO', email: 'MURILO@KEEPLERNING.SCHOLL', fone: '9-9182-4080' },
  { name: 'NATALIA LAZARINE MEIRELES MENEZES', func: 'SOCIO CONSULTIVO', email: '', fone: '' },
  { name: 'NATHALIE REGNIER CORTES', func: 'SOCIO ESTATUTARIO', email: 'ERIKASTANCOLOVICHCONTATO@GMAIL.COM', fone: '11-9-4033-5727' },
  { name: 'NELIO XAVIER BILATE ', func: 'SOCIO ESTATUTARIO', email: 'NELIO@NBHEART.COM.BR', fone: '11-9-7471-6376' },
  { name: 'NEWTON FIOR JUNIOR', func: 'SOCIO ESTATUTARIO', email: 'RAPHAEL.SADDY@ENGAGEFORBUSINESS.COM.BR\nWWW.ENGAGEFORBUSINESS.COM.BR', fone: '11-9-7333-2083' },
  { name: 'NIKOLAS SOARES FARIA ', func: 'SOCIO HONORARIO', email: 'NIKOLAS@EDULABZZ.COM.BR', fone: '11- 9-4072-5205' },
  { name: 'PABLO MAURICIO PAUCAR JACOME', func: 'SOCIO CONSULTIVO', email: 'HABLECONSUPRESIDENTE@GMAIL.COM', fone: '593 99 933 7405' },
  { name: 'PATRICIA ALLEVATO', func: 'SOCIO HONORARIO', email: 'LCBINATO@INSTIAD.COM.BR', fone: '11-9-8659-0299' },
  { name: 'PATRICIA MANSUR', func: 'SOCIO CONSULTIVO', email: 'PATRICIAMANSUR@ARISTA.COM.BR', fone: '11-9-8272-7205/11-3280-1022' },
  { name: 'PAULINE CARVALHO DA SILVA ', func: 'SOCIO HONORARIO', email: 'PAULINE.CARVALHO@GMAIL.COM', fone: '11-9-8614-2269' },
  { name: 'PAULO ANDRE MONTINI', func: 'SOCIO ESTATUTARIO', email: 'INGRIDBELTRAO@BROWNE.COM.BR', fone: '81-988052793' },
  { name: 'PAULO CESAR CHANAN SILVA ', func: 'SOCIO CONSULTIVO', email: 'PAULO.CHANAN@SEREDUCACIONAL.COM', fone: '81-9-9649-1504' },
  { name: 'PAULO PEREZ MACHADO ', func: 'SOCIO CONSULTIVO', email: 'PPEREZ@GRUPOBCI.REC.BR', fone: '81-9-9922-5832' },
  { name: 'PAULO ROGERIO NUNES ', func: 'SOCIO HONORARIO', email: 'LSOLDON@GMAIL.COM', fone: '11-9-8236-2094' },
  { name: 'PEDRO PAULO DE CARVALHO NETO ', func: 'SOCIO CONSULTIVO', email: '', fone: '' },
  { name: 'PYERO DA SILVA TAVOLAZZI ', func: 'SOCIO ESTATUTARIO', email: 'PYERO@DTSGROUP.COM.BR', fone: '11- 9- 9218-0965' },
  { name: 'RAFAEL FIGUEIREDO BEZERRA', func: 'SOCIO FUNDADOR', email: 'RAFAELFIGUEIREDOBEZERRAADV@GMAIL.COM', fone: '81-9-8826-9294' },
  { name: 'RAFAEL FURLANETTI ', func: 'SOCIO CONSULTIVO', email: 'RAFAEL.FURLANETTI@XPI.COM.BR', fone: '11-9-9610-3974' },
  { name: 'RAPHAEL  SADDY', func: 'SOCIO HONORARIO', email: 'MAURO@OLIVEIRAFREITAS.ADV.BR', fone: '61-99152810' },
  { name: 'RAQUEL DE OLIVEIRA', func: 'SOCIO ESTATUTARIO', email: 'PAULO.ANDRE.MONTINI@GMAIL.COM', fone: '11-9-9974-0208' },
  { name: 'RENATO PADOVESE ', func: 'SOCIO CONSULTIVO', email: '', fone: '' },
  { name: 'RICARDO CESAR PINA DANTAS', func: 'SOCIO CONSULTIVO', email: 'RICARDOPINADANTAS@YAHOO.COM.BR', fone: '11 98585 9495 / 3071 3046' },
  { name: 'RICARDO DINIZ', func: 'SOCIO CONSULTIVO', email: 'RICARDODINIZRD@GMAIL.COM', fone: '11 98266 6091' },
  { name: 'RICARDO JORGE BARBOSA PAIVA', func: 'SOCIO ESTATUTARIO', email: 'PROVESI@UNIVALI.BR', fone: '47-3341-7605/47-9-9960-4000' },
  { name: 'RICARDO JUNIOR ', func: 'SOCIO ESTATUTARIO', email: 'FRED@800AUTO.COM.BR', fone: '85-9-8885-8800' },
  { name: 'RICARDO RIBEIRO BELLINO', func: 'SOCIO FUNDADOR', email: 'BELLINO@SCHOOLOFLIFE.COM;RICARDO.BELLINO@GMAIL.COM', fone: '1 (305) 484-8433' },
  { name: 'RICARDO SAMUEL GOLDSTEIN', func: 'SOCIO CONSULTIVO', email: '', fone: '21 98668 8898' },
  { name: 'RICK CHESTNER ', func: 'SOCIO CONSULTIVO', email: '', fone: '' },
  { name: 'ROBERTO MARINHO', func: 'SOCIO CONSULTIVO', email: 'ROBERTO.MARINHO@CONTAZAP.COM.BR', fone: '11 8356 6326' },
  { name: 'RODRIGO ARRUDA DE IVEIRA CABRAL', func: 'SOCIO ESTATUTARIO', email: 'JACSDM@HOTMAIL.COM', fone: '11-9-9392-5338' },
  { name: 'RODRIGO DE MACEDO ALVES ', func: 'SOCIO CONSULTIVO', email: '', fone: '11-9-7093-2225' },
  { name: 'RODRIGO FERRI ESTUDINO ', func: 'SOCIO ESTATUTARIO', email: 'PATRICIAALLEVATOADV@GMAIL.COM', fone: '21-96450-3789/21-3393-0867' },
  { name: 'RODRIGO GAZZOLA RIVELLINO', func: 'SOCIO FUNDADOR', email: 'RR@NOLINE.LIVE', fone: '11-9-8688-8888' },
  { name: 'RUI OTAVIO BERNARDES DE ANDRADE', func: 'SOCIO CONSULTIVO', email: '', fone: '' },
  { name: 'SERGIO COSTA ', func: 'SOCIO ESTATUTARIO', email: '', fone: '11-9-8750-0543/11-2476-8648' },
  { name: 'SERGIO FERREIRA DE LIMA JUNIOR', func: 'SOCIO ESTATUTARIO', email: '', fone: '11-9-8140-2108' },
  { name: 'SERGIO MOURA ', func: 'SOCIO CONSULTIVO', email: '', fone: '' },
  { name: 'SERGIO MURILO ', func: 'SOCIO HONORARIO', email: '', fone: '' },
  { name: 'SILVANA REGINA INACIO ', func: 'SOCIO ESTATUTARIO', email: 'HAROLDOBIKER@GMAIL.COM/ HAROLDO@CRUZENUNES.COM.BR', fone: '11 94756 7118' },
  { name: 'SIMONE BERGAMO SILVA BARRETO', func: 'SOCIO HONORARIO', email: 'SIMONE.BERGAMO@SEREDUCACIONAL.COM', fone: '81 99961 0807' },
  { name: 'SOLON HORMIDAS CALDAS ', func: 'SOCIO HONORARIO', email: 'SOLON@ABMES.ORG.BR', fone: '61-99151-5031' },
  { name: 'STEVEN ASSIS', func: 'SOCIO CONSULTIVO', email: 'SASSIS@SANTANDER.COM.BR', fone: '11 97449 8225 / 98204 4201' },
  { name: 'TEOTONIO VILELA', func: 'SOCIO ESTATUTARIO', email: '', fone: '11-9-9124-6701/11-5060-3871' },
  { name: 'THAIS CORREA ITAQUI', func: 'SOCIO HONORARIO', email: 'THAIS.ITAQUI@GMAIL.COM', fone: '11-9-8204-2849' },
  { name: 'THIAGO LUCANO DANTAS ', func: 'SOCIO ESTATUTARIO', email: 'LUCIANA.DETONI@ISRAELTRADE.GOV.IL/LUCIANAGPDETONI@GMAI.COM', fone: '11-9-8424-1786' },
  { name: 'VALDIR JOSE LANZA ', func: 'SOCIO CONSULTIVO', email: 'VALDIR@EXOFO.CC', fone: '' },
  { name: 'VANDERLEI A ALVES JUNIOR (JACOY ALVES)', func: 'SOCIO ESTATUTARIO', email: 'GRANDIMAURICIO@GMAIL.COM', fone: '11-9-9548-8814' },
  { name: 'VASCO JOSE RAMOS MALTA PATU', func: 'SOCIO FUNDADOR', email: 'VASCOMALTA@GMAIL.COM', fone: '81-9-9336-8846' },
  { name: 'VICTOR SORRENTINO', func: 'SOCIO ESTATUTARIO', email: '', fone: '51 99888 2114' },
  { name: 'WALTER HERBERT DISSINGER', func: 'SOCIO HONORARIO', email: 'DISSINGERW@HOTMAIL.COM', fone: '11-9-9997-3064' },
  { name: 'WANDY CAVALHEIRO', func: 'SOCIO ESTATUTARIO', email: '', fone: '11 96687 0404' },
  { name: 'WESLEY OLIVEIRA DA SILVA ', func: 'SOCIO HONORARIO', email: '', fone: '85 98131 4111' },
  { name: 'WILLIAM DOUGLAS RESINENTE DOS SANTOS ', func: 'SOCIO HONORARIO', email: 'PROFESSORWILLIAMDOUGLAS@GMAIL.COM', fone: '21--9-8182-9473' },
  { name: 'WILLIAN GONCALVES VALDAO', func: 'SOCIO ESTATUTARIO', email: 'VALADAO@BEDUKA.COM', fone: '31 98459 8817' },
  { name: 'YOUSSEF MOURAD', func: 'SOCIO CONSULTIVO', email: 'YOUSSEF.MOURAD@DIGITALPAGES.COM.BR', fone: '11-9-9372-9867' }
]

export default {
  fiery: true,
  data () {
    return {
      loading: false,
      associates: this.$fiery(firebase.firestore.collection('associates'), {
        key: 'id',
        query: q => q.orderBy(name, 'asc')
      }),
      editDialog: false,
      newName: '',
      newEmail: '',
      newOrder: '',
      newCpf: '',
      addAssociateDialog: false,
      actualMember: null,
      name: '',
      email: '',
      cpf: '',
      bio: '',
      order: null,
      image: null,
      imgUrl: '',
      snackbar: false,
      loadingText: 'Carregando...'
    }
  },
  methods: {
    async registerAll () {
      for (let soc of socios) {
        console.log('salvando...')
        // await this.$fires.associates.add(Object.assign(soc, {
        soc = Object.assign(soc, {
          cpf: '',
          bio: '',
          order: 99
        })
        console.log(soc)
        await firebase.firebase.firestore().collection('associates').add(soc)

        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    },
    addAssociate () {
      let url
      this.loading = true
      if (!this.image || !this.image.name) {
        this.snackbar = {
          text: 'Falha: Adicionar uma imagem',
          show: true
        }
        return
      }
      if (!this.name || !this.email || !this.cpf) {
        this.snackbar = {
          text: 'Falha: Completar todos os campos',
          show: true
        }
        return
      }
      firebase.firebase.storage().ref('associates/' + this.image.name).put(this.image).then(async (data) => {
        url = await data.ref.getDownloadURL()
        await this.$fires.associates.add({
          name: this.name,
          email: this.email,
          cpf: this.cpf,
          bio: this.bio,
          order: 99,
          img_url: url
        })
        this.loading = false
      }).catch((_) => {
        this.loading = false
      })

      this.snackbar = {
        text: 'Associado salvo com sucesso!',
        show: true
      }

      this.name = ''
      this.email = ''
      this.cpf = ''
      this.imgUrl = ''
      this.bio = ''
      this.image = null

      this.addAssociateDialog = false
    },
    onPickFile () {
      this.$refs.fileInput.click()
    },
    onFilePicked (event) {
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
