// Memo
// import { memo } from 'react'

// Hooks
import { useForm } from 'react-hook-form'

// Styles
import { MagnifyingGlass } from 'phosphor-react'
import { SearchFormContainer } from './styles'

// Zod
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../../../../contexts/TransactionsContext'

/**
 * Por que um componente renderiza?
 *
 * 1. Hooks changed (mudança de estado, contexto, reducer, etc)
 * 2. Props changed (mudança de props)
 * 3. Parent component re-rendered (re-renderização do componente pai)
 * 4. Force update (atualização forçada)
 *
 * Qual o fluxo de renderização de um componente?
 *
 * 1. O React  recria o HTML da interface do componente
 * 2. Compara o HTML antigo com o novo
 * 3. Se mudou alguma coisa, o React atualiza o HTML
 *
 * Memo:
 *
 * 0. Hooks changed, Props changed, Parent component re-rendered, Force update (deep comparison)
 * 0.1 Comparar a versão anterior dos hooks, props e parent component com a versão atual
 * 0.2 Se mudou alguma coisa, o React atualiza o HTML
 *
 * As vezes não vale a pena usar o memo, pois o React já faz a comparação de forma automática
 * e o memo pode acabar sendo mais custoso que o próprio React.
 */

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
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fetchTransactions
    },
  )

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

// memo é uma função que recebe um componente como parâmetro
// e retorna um componente memoizado

// export const SearForm = memo(SearchFormComponent)
