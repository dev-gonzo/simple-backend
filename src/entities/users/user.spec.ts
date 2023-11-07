import { expect, test } from "vitest";
import { User } from "./user";
import md5 from "crypto-js/md5";

test("instance of a user", () => {
  const user = new User({
    name: "Test Usuário",
    email: "teste@testeuser.com",
    active: true,
  });

  expect(user).toBeInstanceOf(User);
});

test("verify created username", () => {
  const user = new User({
    name: "Test Usuário",
    email: "teste@testeuser.com",
    active: true,
  });

  expect(user?.name).toEqual("Test Usuário");
});

test("verify created mail", () => {
  const user = new User({
    name: "Test Usuário",
    email: "teste@testeuser.com",
    active: true,
  });

  expect(user?.email).toEqual("teste@testeuser.com");
});

test("verity created user as active", () => {
  const user = new User({
    name: "Test Usuário",
    email: "teste@testeuser.com",
    active: true,
  });

  expect(user?.active).toEqual(true);
});

test("verify created user as inactive", () => {
  const user = new User({
    name: "Test Usuário",
    email: "teste@testeuser.com",
    active: false,
  });

  expect(user?.active).toEqual(false);
});

test("do not allow names with abbreviations when they are only two words long", () => {
  expect(() => {
    return new User({
      name: "Test U",
      email: "teste@testeuser.com",
      active: true,
    });
  }).toThrow();
});

test("do not allow names with one word", () => {
  expect(() => {
    return new User({
      name: "Test",
      email: "teste@testeuser.com",
      active: true,
    });
  }).toThrow();
});

test("verify created user id", () => {
  const user = new User({
    id: 1,
    name: "Test Usuário",
    email: "teste@testeuser.com",
    active: false,
  });

  expect(user?.id).toEqual(null);
});

test("verify created user name", () => {
  const user = new User({
    name: "Test Usuário",
    email: "teste@testeuser.com",
    active: false,
  });

  expect(user?.name).toEqual("Test Usuário");
});

test("verify created user email", () => {
  const user = new User({
    id: 1,
    name: "Test Usuário",
    email: "teste@testeuser.com",
    active: false,
  });

  expect(user?.email).toEqual("teste@testeuser.com");
});

test("verify created user password", () => {
  const user = new User({
    id: 1,
    name: "Test Usuário",
    email: "teste@testeuser.com",
    active: false,
    password: "Senha@1234",
  });

  expect(user?.password).toEqual(md5("Senha@1234").toString());
});

test("verify return user data", () => {
  const user = new User({
    id: 1,
    name: "Test Usuário",
    email: "teste@testeuser.com",
    active: false,
    password: "Senha@1234",
  });

  expect(user?.data).toMatchObject({
    name: "Test Usuário",
    email: "teste@testeuser.com",
    active: false,
    password: md5("Senha@1234").toString(),
  });
});
