<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateExpenditureExpensesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('expenditure_expenses', function (Blueprint $table) {

            $table->increments('id');

            $table->string('name')->nullable();
            $table->string('cost');
            $table->string('description')->nullable();
            
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
        Schema::drop('expenditure_expenses');
    }
}
