Rails.application.routes.draw do
  root to: 'messages#index'
  resource :group 
  resource :user
  resource :messages
end
