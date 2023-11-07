Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: 'users/registrations'
  }

  as :user do
    delete '/delete_an_image/' => 'users/registrations#delete_an_image', as: :delete_an_image
  end

  resources :posts do
    resources :comments
  end

  # Defines the root path route ("/")
  root "posts#index"
end
