<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateExpenditureCrewsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('expenditure_crews', function (Blueprint $table) {

            $table->increments('id');

            $table->string('name')->nullable();
            $table->string('cost');
            $table->string('description')->nullable();

            $table->integer('expenditure_profile_id')->unsigned()->index();

            $table->integer('enroller_id')->unsigned()->nullable()->index();
            $table->foreign('enroller_id')->references('id')->on('expenditure_enrollers');

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
        Schema::drop('expenditure_crews');
    }
}
