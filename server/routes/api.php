<?php

use App\Http\Controllers\Controller;
use Illuminate\Http\Middleware\HandleCors;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use PSpell\Config;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/', [Controller::class, 'showTasks']);

Route::post('/', [Controller::class, 'createTask']);

Route::delete('/delete', [Controller::class, 'deleteTasks']);

Route::delete('/delete/{id}', [Controller::class, 'deleteTask']);

Route::put('/change_status/{id}', [Controller::class, 'changeStatus']);
