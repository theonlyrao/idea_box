FactoryGirl.define do
  factory :idea do
    sequence(:title) { |n| "Idea#{n}" }
    sequence(:body) { |n| "Body #{n} This is really long to get over the 100 character count. In fact it needs to be even longer than this because otherwise it is really hard to get to 100 characters." }
    quality "swill"
  end
end
