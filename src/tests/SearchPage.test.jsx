import {fireEvent, render, screen} from "@testing-library/react";
import SearchPage from "../components/SearchPage";
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom';

describe(SearchPage, () => {

    beforeEach(() => {
        render(
            <BrowserRouter>
                <SearchPage />
            </BrowserRouter>
        )
    })

    // Individual tests
    test("favourites button", () => {
        const addButtons = screen.getAllByRole('button', {name:/add to favourite/i});
        fireEvent.click(addButtons[0])
        const removeButton = screen.getByRole('button', { name: /remove/i });
        expect(removeButton).toBeInTheDocument();
    })
})
