class Post < ApplicationRecord
  has_many :comments, dependent: :destroy #, class_name: "comments, foreign_key: "reference_id"
end
