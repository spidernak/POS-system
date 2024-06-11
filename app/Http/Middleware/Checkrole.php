<?php

namespace App\Http\Middleware;

use Closure;
use Auth;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Checkrole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $role = null): Response
    {
        if(Auth::check() && (Auth::user()->role == $role || Auth::user()->role == "admin"))
        return $next($request);

        return response("You don't have the permission to access this page!");
    }
}
