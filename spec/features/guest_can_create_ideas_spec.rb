require 'rails_helper'

RSpec.feature "GuestCanCreateIdeas", type: :feature do
  scenario "enters all necessary info", js: true do
    visit root_path
    within ".new-idea" do
      fill_in "Title", with: "A new idea title"
      fill_in "Describe the idea", with: "A new idea body"
      click_button "Save"
    end

    within ".new-idea" do
      expect(page).not_to have_content("A new idea title")
      expect(page).not_to have_content("A new idea body")
    end

    within ".idea-list" do
      expect(page).to have_content("A new idea title")
      expect(page).to have_content("A new idea body")
      expect(page).to have_content("swill")
    end
  end
end
