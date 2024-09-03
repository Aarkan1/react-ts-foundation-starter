import { act, render } from "@testing-library/react";
import AuthProvider, { AuthContext, AuthContextValue } from "../AuthProvider";

// placeholder for the context, which we use in the tests
let context: AuthContextValue;

// helper to render provider and add the context to the placeholder
const renderContext = () => {
  render(
    <AuthProvider>
      <AuthContext.Consumer>
        {(value) => {
          // update context placeholder on every render
          // to always have the latest state
          context = value;
          return <></>;
        }}
      </AuthContext.Consumer>
    </AuthProvider>
  );
};

describe("<AuthProvider />", () => {
  test("should set user when logging in successfully", async () => {
    // should be called first in every test
    renderContext();

    expect(context.user).toEqual(null);

    // when testing, code that causes state updates should be wrapped in an act() callback
    act(() => context.login("admin"));

    expect(context.user).toEqual("admin");
    expect(context.loginError).toEqual(false);
  });

  test("should set loginError to true when login fails", async () => {
    renderContext();

    act(() => context.login("bad-credentials"));

    expect(context.user).toEqual(null);
    expect(context.loginError).toEqual(true);
  });

  test("should set user to null when logging out", async () => {
    renderContext();

    act(() => context.login("admin"));
    expect(context.user).toEqual("admin");

    act(() => context.logout());
    expect(context.user).toEqual(null);
  });
});
