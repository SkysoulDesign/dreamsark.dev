<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

/**
 * Class CreateGameStageDataTable
 */
class CreateGameItemUserTable extends Migration
{

    use SchemaTrait;

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $this->schema->create('game_item_user', function (Blueprint $table) {

            $table->increments('id');

            $table->integer('user_id')->unsigned()->index();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->integer('item_id')->unsigned()->index();
            $table->foreign('item_id')->references('id')->on('game_group_item')->onDelete('cascade');

            $table->integer('quantity');

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
        $this->schema->drop('game_item_user');
    }
}
