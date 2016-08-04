<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

/**
 * Class CreateProjectRewardItemTable
 */
class CreateProjectRewardItemTable extends Migration
{

    use SchemaTrait;

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $this->schema->create('project_reward_item', function (Blueprint $table) {

            $table->increments('id');

            $table->integer('reward_id')->unsigned()->index();
            $table->foreign('reward_id')->references('id')->on('project_reward')->onDelete('cascade');

            $table->integer('item_id')->unsigned()->index();
            $table->foreign('item_id')->references('id')->on('game_group_item')->onDelete('cascade');

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
        $this->schema->drop('project_reward_item');
    }
}
