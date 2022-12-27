import { MockedProvider } from "@apollo/client/testing";
import { fireEvent, render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { LOGIN_QUERY } from "../../apollo/queries";

import  LoginForm from "./LoginForm";

const loginMock = [{
  request: {
    query: LOGIN_QUERY,
    variables: {data:{ email: "email@test.com", password: "password" }},
  },
  result: {
    data: {
      login: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdtQHRlc3QuY29tIiwiaWF0IjoxNjYzODYwODYxLCJleHAiOjE2NjM4NjQ0NjF9.Bk_1YWiA3Ob04tzlHfps0Z83gKC5kTWcLIl3ZAAwKoQ"
    }
  }
}]

 describe("LoginForm", () => {

  it("Button should be not disabled", async () => {
    const { getByText, getByLabelText } =  render(
      <MockedProvider mocks={loginMock}>
        <LoginForm />
      </MockedProvider>
    )

    const emailInput = getByLabelText("Email")
    const passwordInput = getByLabelText("Mot de passe")
    const submitButton = getByText("Connexion")
    
    await act(() => {
      fireEvent.change(emailInput, { target: { value: "email@test.com" } })
      fireEvent.change(passwordInput, { target: { value: "password" } })  
    }) 

    await act(() => {
      fireEvent.click(submitButton)
    }) 
    

   expect(submitButton).not.toBeDisabled()
  })

  it("Button should be disabled and error fired", async () => {
    const {getByText, getByLabelText } =  render(
      <MockedProvider mocks={loginMock}>
        <LoginForm />
      </MockedProvider>
    )

    const emailInput = getByLabelText("Email")
    const passwordInput = getByLabelText("Mot de passe")
    const submitButton = getByText("Connexion")
    
    await act(() => {
      fireEvent.change(emailInput, { target: { value: "emailtest.com" } })
      fireEvent.change(passwordInput, { target: { value: "" } })  
    }) 

    await act(() => {
      fireEvent.click(submitButton)
    }) 

   expect(submitButton).toBeDisabled()
   expect(getByText("Adresse email non valide")).toBeInTheDocument();
   expect(getByText("Le mot de passe est requis")).toBeInTheDocument();
  })
}) 

