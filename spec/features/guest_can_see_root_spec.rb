require 'rails_helper'

RSpec.feature "GuestCanSeeRoot", type: :feature do
  scenario "guest visits root path" do
    visit root_path

    within ".new-idea-title" do
      expect(page).to have_content("New Idea")
    end

    within ".your-ideas-title" do
      expect(page).to have_content("Your Ideas")
    end
  end
end
