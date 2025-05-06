<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pembinas', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('nip')->unique(); // disarankan jadi unik karena akan digunakan sebagai email dan password
            $table->string('email')->unique();
            $table->string('password');
            $table->date('tanggal_lahir')->nullable(); // pakai tipe date, bukan string
            $table->string('alamat')->nullable();
            $table->string('no_hp')->nullable(); // tambahkan jika digunakan
            $table->string('role')->default('pembina');
            $table->rememberToken(); // untuk jaga-jaga jika nanti pakai "remember me"
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pembinas');
    }
};
