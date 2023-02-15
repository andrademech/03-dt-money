// Hooks
import { useForm } from 'react-hook-form'

// Styles
import { MagnifyingGlass } from 'phosphor-react'
import { SearchFormContainer } from './styles'

// Zod
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { TransactionsContext } from '../../../../contexts/TransactionsContext'

// o Zod é uma biblioteca que permite a criação de schemas para validação de dados
// o zodResolver é uma função que permite a integração do Zod com o React Hook Form
// o z.object é uma função que cria um schema de objeto
// o z.string é uma função que cria um schema de string

// Schema
const searchFormSchema = z.object({
  // o z.string().min(3) é um schema de string que permite apenas strings com no mínimo 3 caracteres
  query: z.string(),
})

// Types
type SearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm() {
  const { fetchTransactions } = useContext(TransactionsContext)

  // React Hook Form
  const {
    // register é uma função que retorna um objeto com as propriedades necessárias para o input
    register,
    // handleSubmit é uma função que recebe uma função como parâmetro
    handleSubmit,
    // formState é um objeto que contém informações sobre o estado do formulário
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    // resolver é uma função que recebe um schema como parâmetro
    resolver: zodResolver(searchFormSchema),
  })

  // Functions
  async function handleSearchTransactiosn(data: SearchFormInputs) {
    await fetchTransactions(data.query)

    console.log(data)
  }

  return (
    <SearchFormContainer
      // passando a função handleSubmit para o form
      onSubmit={handleSubmit(handleSearchTransactiosn)}
    >
      <input
        type="text"
        placeholder="Busque por transações"
        // passando a função register para o input
        {...register('query')}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass />
        Buscar
      </button>
    </SearchFormContainer>
  )
}
