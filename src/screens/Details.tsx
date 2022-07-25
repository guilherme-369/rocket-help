import { VStack } from "native-base";
import { Header } from "../components/Header";
import { useRoute } from "@react-navigation/native";

type RouteParams = {
  orderId: string;
};

export const Details = () => {
  const route = useRoute();
  const { orderId } = route.params as RouteParams;

  return (
    <VStack>
      <Header title="Solicitação" />
    </VStack>
  );
};
