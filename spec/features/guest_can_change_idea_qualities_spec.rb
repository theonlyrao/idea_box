require 'rails_helper'

RSpec.feature "GuestCanChangeIdeaQualities", type: :feature do
  scenario "idea goes from plausible to genius", js: true do
    @idea = create(:idea, title: "plausible idea", quality: "plausible")
    visit root_path

    within ".idea-list" do
      find(".thumbs-up").click
      expect(page).to have_content("plausible idea")
      expect(page).to have_content("genius")
    end
  end

  scenario "idea goes from plausible to skill" do
  end

  scenario "idea goes from genius to plausible" do
  end

  scenario "idea goes from swill to plausible" do
  end

  scenario "idea stays on swill" do
  end

  scenario "idea stays on genius" do
  end
end
