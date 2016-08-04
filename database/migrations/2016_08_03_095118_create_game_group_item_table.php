<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

/**
 * Class CreateGameGroupItemTable
 */
class CreateGameGroupItemTable extends Migration
{

    use SchemaTrait;

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $this->schema->create('game_group_item', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('group_id')->unsigned()->index();
            $table->foreign('group_id')->references('id')->on('game_groups')->onDelete('cascade');

            $table->string('name')->unique();
            $table->string('image');
            $table->integer('cost');
            $table->tinyInteger('probability');

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
        $this->schema->drop('game_group_item');
    }
}
