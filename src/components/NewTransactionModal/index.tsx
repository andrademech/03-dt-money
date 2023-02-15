// Contextos
import { useContext } from 'react'
import { TransactionsContext } from '../../contexts/TransactionsContext'

// React Hook Form
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

// Zod
import * as z from 'zod'

// Styles
import * as Dialog from '@radix-ui/react-dialog'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'

import {
  Overlay,
  Content,
  CloseButton,
  TransactionType,
  TransactionTypeButton,
} from './styles'

const NewTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

type NewTransactionFormInputs = z.infer<typeof NewTransactionFormSchema>

export function NewTransactionModal() {
  const { createTransaction } = useContext(TransactionsContext)

  const {
    // contro é um objeto que contém informações sobre o
    // estado do formulário e permite a manipulação do mesmo
    control,
    // register é uma função que retorna um objeto com as propriedades necessárias para o input
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(NewTransactionFormSchema),
    defaultValues: {
      type: 'income',
    },
  })

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    const { description, price, category, type } = data
    await createTransaction({
      description,
      price,
      category,
      type,
    })

    reset()

    console.log(data)
  }

  return (
    // O Dialog.Portal é um componente que permite a criação de um portal
    // O portal permite que o conteúdo seja renderizado fora do elemento pai
    // O Overlay é um componente que permite a criação de um overlay
    // O overlay é um componente que fica por cima do conteúdo e permite a criação de efeitos visuais
    // O Content é um componente que permite a criação de um conteúdo
    // O conteúdo é um componente que fica por cima do overlay e permite a criação de conteúdo

    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Nova Transação</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register('description')}
          />
          <input
            type="number"
            placeholder="Preço"
            required
            {...register('price', { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            {...register('category')}
          />

          {/* O Controller é um componente que permite a integração do React Hook Form com outros componentes */}
          <Controller
            control={control}
            name="type"
            // O render é uma função que recebe como parâmetro um objeto com informações sobre o estado do formulário
            render={({ field }) => {
              return (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransactionTypeButton variant="income" value="income">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>

                  <TransactionTypeButton variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
