require 'rails_helper'

RSpec.feature "GuestCanDeleteIdeas", type: :feature do
  scenario "when ideas exist", js: true do
    @idea = create(:idea)

    visit root_path

    find(".delete").click
    expect(page).not_to have_content(@idea.title)
  end
end
