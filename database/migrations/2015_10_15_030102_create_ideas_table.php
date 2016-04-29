<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateIdeasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ideas', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('project_id')->unsigned()->index()->unique();
            $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade');
            $table->string('content');
            $table->string('reward');
            $table->boolean('active')->default(true);

            $table->integer('submission_id')->unsigned()->nullable()->index();
            $table->foreign('submission_id')->references('id')->on('submissions')->onDelete('cascade');

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
        Schema::drop('ideas');
    }
}
