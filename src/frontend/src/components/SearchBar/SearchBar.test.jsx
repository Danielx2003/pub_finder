import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchBar from './SearchBar';
import { describe, it, expect, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';

describe('SearchBar', () => {
    // it('Renders the search bar', () => {
    //     render(<SearchBar />);
    //     const searchBar = screen.getByRole('textbox');
    //     expect(searchBar).toBeInTheDocument();
    // })

    // it('Updates input value on change', async () => {
    //     const user = userEvent.setup()

    //     render(<SearchBar />)
    //     const searchBar = screen.getByRole('textbox');

    //     await user.type(searchBar, 'Hello World')
    //     expect(searchBar).toHaveValue('Hello World')
    // })

    // it('Prevents Search When Query Is Empty', async () => {
    //     const user = userEvent.setup()

    //     render(<EventSearch />)
    //     const searchBar = screen.getByRole('textbox');

    //     await user.type(searchBar, 'Hello World')
    //     await user.type(searchBar, '{enter}')

    //     expect(handleSubmit).toHaveBeenCalled();
    // })
});