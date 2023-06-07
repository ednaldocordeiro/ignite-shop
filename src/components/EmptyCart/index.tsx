import { SmileyMeh } from "@phosphor-icons/react";
import { Container } from "./styles";

export function EmptyCart() {
  return (
    <Container>
      <SmileyMeh size={44} color="white" />
      <span>Opps! Não tem nada por aqui.</span>
    </Container>
  )
}