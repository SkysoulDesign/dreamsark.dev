<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExpenditurePositionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('expenditure_positions', function (Blueprint $table) {

            $table->increments('id');
            $table->string('name');

            $table->integer('expenditure_type_id')->unsigned()->nullable()->index();
            $table->foreign('expenditure_type_id')->references('id')->on('expenditure_types')->onDelete('cascade');

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
        Schema::drop('expenditure_positions');
    }
}
