import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { TransactionsContainer, TransactionsTable, PriceHighlight } from "./styles";

export function Transactions() {
  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>

            <tr>
              <td width="50%">Desnvolvimento de site</td>
              <td>
                <PriceHighlight variant="income">
                  R$ 12.000,00
                </PriceHighlight>
              </td>
              <td>Venda</td>
              <td>01/02/2023</td>
            </tr>

            <tr>
              <td width="50%">Lanche</td>
              <td>
                <PriceHighlight variant="outcome">
                  - R$ 90,00
                </PriceHighlight>
              </td>
              <td>Alimentação</td>
              <td>03/02/2023</td>
            </tr>

          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}