import Link from "next/link";
import { useRouter } from "next/router";
import { LoginSchema } from "@/models/AuthSchema";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { setCookie } from "cookies-next";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { isAuth } from "@/redux/AuthState";
import ToastComponent from "../UI/ToastComponent";

const LoginComponent = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const toast = ToastComponent();

  const { errors, handleSubmit, register } = LoginSchema();

  const loginHandler = useCallback(
    (token) => {
      dispatch(isAuth(true));
      setCookie("token", token);
    },
    [dispatch]
  );
  const submitHandler = useCallback(
    async (userData) => {
      try {
        const res = await axios
          .post("/api/auth/login", userData, { withCredentials: true })
          .catch((error) => {
            const err = error.response.data.message;
            throw err;
          });

        if (res.data.token) {
          toast({ title: "login success", status: res.data.status });
          loginHandler(res.data.token);
        }
      } catch (error) {
        toast({ message: "login failed, pls try again", status: "error" });
        return;
      }

      router.push("/");
    },
    [loginHandler, router, toast]
  );

  return (
    <Container
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        w="full"
        border="lightgray 1px solid"
        py={4}
        px={5}
        shadow="base"
        borderRadius="lg"
        maxW="sm"
        minH="md"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Box>
          <Heading textAlign="center" lineHeight="short" mb={2}>
            LOGIN
          </Heading>
          <Divider bgColor="blackAlpha.900" mb={7} />
        </Box>

        <form onSubmit={handleSubmit(submitHandler)}>
          <Stack spacing={3}>
            <FormControl isInvalid={errors?.email}>
              <Input
                type="email"
                shadow="sm"
                {...register("email")}
                placeholder="email"
              />
              {errors.email && (
                <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={errors?.password}>
              <Input
                type="password"
                shadow="sm"
                {...register("password")}
                placeholder="password"
              />
              {errors.email && (
                <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
              )}
            </FormControl>
            <Button type="submit">LOGIN</Button>
            <Text>
              dont have an account?{" "}
              <Button
                as={Link}
                href="/auth/signup"
                variant="link"
                color="blue.600"
              >
                signup
              </Button>
            </Text>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};

export default LoginComponent;
