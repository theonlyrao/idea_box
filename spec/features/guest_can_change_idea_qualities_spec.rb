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

  scenario "idea goes from plausible to swill", js: true do
    @idea = create(:idea, title: "plausible idea", quality: "plausible")
    visit root_path

    within ".idea-list" do
      find(".thumbs-down").click
      expect(page).to have_content("plausible idea")
      expect(page).to have_content("swill")
    end
  end

  scenario "idea goes from genius to plausible", js: true do
    @idea = create(:idea, title: "genius idea", quality: "genius")
    visit root_path

    within ".idea-list" do
      find(".thumbs-down").click
      expect(page).to have_content("genius idea")
      expect(page).to have_content("plausible")
    end
  end

  scenario "idea goes from swill to plausible", js: true do
    @idea = create(:idea, title: "swill idea", quality: "swill")
    visit root_path

    within ".idea-list" do
      find(".thumbs-up").click
      expect(page).to have_content("swill idea")
      expect(page).to have_content("plausible")
    end
  end

  scenario "idea stays on swill", js: true do
    @idea = create(:idea, title: "swill idea", quality: "swill")
    visit root_path

    within ".idea-list" do
      find(".thumbs-down").click
      expect(page).to have_content("swill idea")
      expect(page).to have_content("swill")
    end
  end

  scenario "idea stays on genius", js: true do
    @idea = create(:idea, title: "genius idea", quality: "genius")
    visit root_path

    within ".idea-list" do
      find(".thumbs-up").click
      expect(page).to have_content("genius idea")
      expect(page).to have_content("genius")
    end
  end
end
