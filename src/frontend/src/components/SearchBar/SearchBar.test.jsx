import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchBar from './SearchBar';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

describe('SearchBar', () => {
    it('renders the search bar', () => {
        const setSearchValue = vi.fn()

        render(
            <SearchBar
            searchValue=""
            setSearchValue={setSearchValue}
            />
        )

        const searchBar = screen.getByRole('textbox')
        expect(searchBar).toBeInTheDocument()
    })

    it.each([
    { input: 'a', expectedCalls: 1, lastCall: 'a' },
    { input: 'ab', expectedCalls: 2, lastCall: 'b' },
    { input: 'abc', expectedCalls: 3, lastCall: 'c' },
    ])(
    'calls setSearchValue correct number of times for input "$input"',
    async ({ input, expectedCalls, lastCall }) => {
        const user = userEvent.setup({ delay: null })
        const setSearchValue = vi.fn()

        render(<SearchBar searchValue="" setSearchValue={setSearchValue} />)
        const inputEl = screen.getByRole('textbox')
        await user.type(inputEl, input)

        expect(setSearchValue).toHaveBeenCalledTimes(expectedCalls)
        expect(setSearchValue).toHaveBeenLastCalledWith(lastCall)
    }
    )
});