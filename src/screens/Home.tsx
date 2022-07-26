import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  VStack,
  HStack,
  IconButton,
  useTheme,
  Text,
  Heading,
  FlatList,
  Center,
} from "native-base";
import { SignOut, ChatTeardropText } from "phosphor-react-native";

import Logo from "../assets/logo_primary.svg";

import { Filter } from "../components/Filter";
import { Button } from "../components/Button";
import { Order, OrderProps } from "../components/Order";

export const Home = () => {
  const [statusSelect, setStatusSelect] = useState<"open" | "closed">("open");
  const [orders, setOrders] = useState<OrderProps[]>([
    {
      id: "10",
      patrimony: "123456",
      when: "18/10/2002",
      status: "closed",
    },
  ]);

  const navigation = useNavigation();
  const { colors } = useTheme();

  const HandleNewOrder = () => {
    navigation.navigate("new");
  };

  const handleOpenDetails = (orderId: string) => {
    navigation.navigate("details", { orderId });
  };

  return (
    <VStack flex={1} pb={5} bg="gray.700">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
      >
        <Logo height={60} />
        <IconButton icon={<SignOut size={26} color={colors.gray[300]} />} />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack
          w="full"
          mt={8}
          mb={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading color="gray.100">Solicitações</Heading>
          <Text color="gray.200">{orders.length}</Text>
        </HStack>
        <HStack space={3} mb={8}>
          <Filter
            type="open"
            title="Em andamento"
            onPress={() => setStatusSelect("open")}
            isActive={statusSelect === "open"}
          />
          <Filter
            type="closed"
            title="Finalizado"
            onPress={() => setStatusSelect("closed")}
            isActive={statusSelect === "closed"}
          />
        </HStack>

        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Order data={item} onPress={() => handleOpenDetails(item.id)} />
          )}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Center>
              <ChatTeardropText color={colors.gray[300]} size={40} />
              <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                Você ainda não possui {"\n"}solicitações
                {statusSelect === "open" ? " em andamento" : " finalizadas"}
              </Text>
            </Center>
          )}
        />
        <Button title="Nova Solicitação" onPress={HandleNewOrder} />
      </VStack>
    </VStack>
  );
};
