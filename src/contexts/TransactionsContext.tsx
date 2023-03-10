import React, { useEffect, useState, useCallback } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../lib/axios'

// Criando uma interface para tipar o contexto
interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

// Criando uma interface para tipar os dados que serão passados para a função de criação de transações
interface CreateTransactionInput {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

// Criando um contexto para armazenar as transações e as funções que irão manipulá-las
interface TransactionContextType {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
}

interface TransactionsProviderProps {
  children: React.ReactNode
}

// Criando e exportando um contexto
export const TransactionsContext = createContext({} as TransactionContextType)

// Criando um componente que irá prover o contexto
// O componente irá receber como parâmetro o children
// O children é o conteúdo que estará dentro do componente
// O componente irá retornar o contexto com o valor que for passado para ele
export function TransactionsProvider({ children }: TransactionsProviderProps) {
  // Criando um estado para armazenar as transações
  const [transactions, setTransactions] = useState<Transaction[]>([])

  // Criando uma função para carregar as transações

  // usando useCallback

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get('transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })

    setTransactions(response.data)
  }, [])

  // Usando o useCallback para criar uma função que não irá ser recriada toda vez que o componente for renderizado
  // O useCallback recebe como parâmetro a função que será criada e um array de dependências
  // O array de dependências é um array que contém as variáveis que serão monitoradas
  // Caso alguma variável do array de dependências seja alterada, a função será recriada
  // Caso o array de dependências seja vazio, a função será criada apenas uma vez

  // Criando uma função para criar uma nova transação e adicionar ela ao estado
  // A função irá receber como parâmetro os dados da transação

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { description, price, category, type } = data
      const response = await api.post('transactions', {
        description,
        price,
        category,
        type,
        // numa situação real, o createdAt deveria ser gerado no backend
        createdAt: new Date(),
      })

      setTransactions((state) => [response.data, ...state])
    },
    [],
  )

  // Criando um efeito que irá carregar as transações
  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
