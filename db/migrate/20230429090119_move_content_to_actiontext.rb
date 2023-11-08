class MoveContentToActiontext < ActiveRecord::Migration[7.0]
  def change
    Post.all.find_each do |post|
      post.update(description: post.content)
    end
  end
end
