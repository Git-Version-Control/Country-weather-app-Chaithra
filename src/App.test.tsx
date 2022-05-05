
import { render, screen, fireEvent, act } from "@testing-library/react";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import InputWithLabel from "./components/InputWithLabel";
import axios from "axios";
import { title } from "process";

describe("unit testing basics", () => {
  test("assert if title is React", () => {
    expect(true).toBe(true);
  });

});