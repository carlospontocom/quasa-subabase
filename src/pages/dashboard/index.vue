<template>
    <section>

        <div class="flex items-center justify-between q-pa-none p-ma-none q-px-lg">
            <div>
                <h2>Dashboard</h2>
                 <div>
                     <p v-if="usuario">Área do usuário — {{ usuario.email }}</p>
                    <p v-else>Área do usuário</p>
                </div>
            </div>
            <q-btn icon="close" />
        </div>


        <div>
            <q-form class="flex column q-gutter-lg q-pa-lg" @submit.prevent="handleAddTransacao">
                <q-input type="number" v-model="formulario.valor" outlined />
                <q-input type="text" v-model="formulario.descricao" outlined />
                <q-btn label="Adicionar transação" color="green" type="submit" />
            </q-form>

            <div>
                <div v-for="transacao in transacoes" :key="transacao.id"
                    class="flex items-center justify-between q-pa-none p-ma-none q-px-lg">
                    <p>{{ transacao.descricao }}</p>
                    <p>{{ moedaBR(transacao.valor) }}</p>
                    <div>
                        <q-btn icon="delete" color="red" @click="handleDeleteTransacao(transacao.id)" />
                    </div>
                </div>
            </div>
        </div>



    </section>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '@/boot/supabase'


const usuario = ref<any>(null)

onMounted(async () => {
    const { data, error } = await supabase.auth.getUser()

    if (error) {
        console.error('Erro ao buscar usuário:', error.message)
        return
    }

    if (data?.user) {
        usuario.value = data.user
    }
})


interface Formulario {
    valor: number | null,
    descricao: string
}

interface Carteira {
    id: number
    valor: number
    descricao: string
}

const formulario = ref<Formulario>({
    valor: null,
    descricao: ''
})


const transacoes = ref<Carteira[]>([{
    id: 1,
    valor: 100.00,
    descricao: "Salário"
},
{
    id: 2,
    valor: 30.00,
    descricao: "Compras"
}])

function handleAddTransacao(): void {
    if (!formulario.value.descricao.trim()) {
        alert("Preencha os campos!");
        return
    }

    if (!formulario.value.valor || formulario.value.valor <= 0) {
        alert("Digite o valor maior do que 0")
        return
    }

    else {
        transacoes.value.push({
            id: Date.now(),
            valor: formulario.value.valor,
            descricao: formulario.value.descricao
        })
        formulario.value.valor = null
        formulario.value.descricao = ''
    }
}

const moedaBR = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor)
}

function handleDeleteTransacao(id: number): void {
    transacoes.value = transacoes.value.filter(t => t.id !== id);
}

</script>