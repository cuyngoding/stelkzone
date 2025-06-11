<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('pendaftaran_ekskul', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('siswa_id');
            $table->unsignedBigInteger('ekskul_id');
            $table->timestamps();

            $table->foreign('siswa_id')->references('id')->on('siswas')->onDelete('cascade');
            $table->foreign('ekskul_id')->references('id')->on('ekskuls')->onDelete('cascade');

            $table->unique(['siswa_id', 'ekskul_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('pendaftaran_ekskul');
    }
};
