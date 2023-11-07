class PostsController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]

  # GET /posts
  def index
    @posts = Post.all.order("created_at DESC")

    @users = User.all.order("created_at DESC")
  end

  # GET /posts/1
  def show
    @post = Post.find(params[:id])
  end

  # GET /posts/new
  def new
    @post = current_user.posts.build
  end

  # POST /posts
  def create
    @post = current_user.posts.build(post_params)

    respond_to do |format|
      if @post.save
        format.html { redirect_to root_path, notice: 'Post was successfully created' }
        format.json { render json: @post.errors, status: :created, location: @post }
      else
        format.html {render :new}
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH /posts/:id
  def update
    @post = Post.find(params[:id])

    respond_to do |format|
      if @post.update(post_params)
        format.html { redirect_to root_path, notice: 'Post was successfully updated' }
        format.json { render json: @post.errors, status: :created, location: @post }
      else
        format.html {render :new}
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  def edit
    @post = current_user.posts.find(params[:id])
  end

  def destroy
    @post = current_user.posts.find(params[:id])
    @post.destroy
    redirect_to posts_path
  end

  private

  def set_tweeet
    @tweeet = Tweeet.find(params[:id])
  end

  def post_params
    params.require(:post).permit(:title, :description)
  end

end
