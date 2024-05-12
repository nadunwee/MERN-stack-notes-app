<?php

use App\Http\Controllers\Api\StudentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('students', [StudentController::class, 'index']);
Route::post('student/new', [StudentController::class, 'store']);
Route::get('student/{id}', [StudentController::class, 'show']);
Route::patch('student/{id}/edit', [StudentController::class, 'edit']);
Route::delete('student/{id}/delete', [StudentController::class, 'delete']);

