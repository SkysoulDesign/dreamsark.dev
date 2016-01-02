<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExpenditureCastsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('expenditure_casts', function (Blueprint $table) {

            $table->increments('id');

            $table->string('name')->nullable();
            $table->string('cost');
            $table->string('description');

            $table->integer('expenditure_position_id')->unsigned()->index();
            $table->foreign('expenditure_position_id')->references('id')->on('expenditure_positions')->onDelete('cascade');

            $table->integer('user_id')->unsigned()->nullable()->index();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

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
        Schema::drop('expenditure_casts');
    }
}
