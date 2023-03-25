<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use App\Classes\ControlClass;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\CheckList;
use Barryvdh\Debugbar\Facades\Debugbar;
use LDAP\ResultEntry;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function createTask(Request $request) {
        $task = new CheckList;
        $task->title = $request['title'];
        $task->save();
    }
    public function showTasks()
    {
        $tasks = CheckList::all();
        $result = array();
        foreach ($tasks as $task)
        {
            $result[] = ['id' => $task->id, 'title' => $task->title, 'status' => $task->status];
        }
        $result = json_encode($result);
        return response()->json($result);
    }

    public function deleteTasks()
    {
        $tasks = CheckList::all();
        foreach ($tasks as $task)
        {
            $task->forceDelete();
        }
    }
    public function deleteTask($id)
    {
        $task = CheckList::find($id);
        $task->forceDelete();
    }

    public function changeStatus(Request $request, $id)
    {
        $task = CheckList::find($id);
        $task->status = $request['status'];
        $task->save();
    }
}
