<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEkskulsTable extends Migration
{
    public function up()
    {
        Schema::create('ekskuls', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->text('deskripsi')->nullable();
            $table->string('pembina')->nullable();
            $table->string('pembina_putra')->nullable();
            $table->string('pembina_putri')->nullable();
            $table->string('ketua')->nullable();
            $table->string('ketua_putra')->nullable();
            $table->string('ketua_putri')->nullable();
            $table->string('logo')->nullable();
            $table->timestamps();

        });
    }

    public function down()
    {
        Schema::dropIfExists('ekskuls');
    }
}
