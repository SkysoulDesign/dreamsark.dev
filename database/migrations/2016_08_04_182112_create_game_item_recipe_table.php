<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

/**
 * Class CreateGameItemRecipeTable
 */
class CreateGameItemRecipeTable extends Migration
{

    use SchemaTrait;

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $this->schema->create('game_item_recipe', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('item_id')->unsigned()->index();
            $table->foreign('item_id')->references('id')->on('game_group_item')->onDelete('cascade');

            $table->integer('recipe_id')->unsigned()->index();
            $table->foreign('recipe_id')->references('id')->on('game_recipes')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $this->schema->drop('game_item_recipe');
    }
}
