Rails.application.routes.draw do
  resources :posts, only: [:index, :new, :create, :show, :update, :edit, :destory]
  resources :comments, only: [:create, :update ]

  # Defines the root path route ("/")
  root "posts#index"
end
