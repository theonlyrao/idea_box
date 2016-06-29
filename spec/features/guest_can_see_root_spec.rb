require 'rails_helper'

RSpec.feature "GuestCanSeeRoot", type: :feature do
  scenario "guest visits root path" do
    visit root_path

    within ".navbar" do
      expect(page).to have_content("IdeaBox")
    end

    within "h1" do
      expect(page).to have_content("Your Ideas")
    end
  end
end
