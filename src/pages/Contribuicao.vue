<template>
    <v-container>
        <v-layout column style="margin-top: 100px;">
            <v-layout wrap>
                <v-layout justify-center align-center mb-2>
                    <v-card @click="goTo('https://pag.ae/7VCPSa9m8')" class="elevation-4 fonte-card text-center" style="background-color: #4d57a6" height="200" width="200">
                        <v-layout justify-center align-center style="height: 100%">
                            <h3>Sócio Fundador</h3>
                        </v-layout>

                    </v-card>
                </v-layout>
                <v-layout justify-center align-center mt-2>
                    <v-card @click="goTo('https://pag.ae/7VDFVJ1Qo')" class="elevation-4 fonte-card text-center" style="background-color: #4d57a6" height="200" width="200">
                        <v-layout justify-center align-center style="height: 100%">
                            <h3>Sócio Conselheiro</h3>
                        </v-layout>
                    </v-card>
                </v-layout>
                <v-layout justify-center align-center mt-2>
                    <v-card @click="goTo('https://pag.ae/7VCPSJAcP')" class="elevation-4 fonte-card text-center" style="background-color: #4d57a6" height="200" width="200">
                        <v-layout justify-center align-center style="height: 100%">
                            <h3>Sócio Estatuário</h3>
                        </v-layout>

                    </v-card>
                </v-layout>
            </v-layout>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    methods: {
			goTo (link) {
				window.open(link, '_self')
			}
    }
}
</script>

<style scoped>
@font-face {
  font-family: "Helvetica-Bold";
  src: url("../assets/fonts/Helvetica Now Display Bold.otf");
}

.fonte-card{
    font-family: "Helvetica-Bold";
    font-weight: 700;
    font-size: 30px;
    color: white;
}
</style>
