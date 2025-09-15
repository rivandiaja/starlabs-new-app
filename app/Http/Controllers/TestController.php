<?php
namespace App\Http\Controllers;
use App\Events\MyEvent;

class TestController extends Controller
{
    public function triggerEvent()
    {
        event(new MyEvent('hello world'));
        return response()->json(['status' => 'event triggered']);
    }
}
    