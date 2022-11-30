<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SetEtag
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $method = $request->getMethod();

        // Support using HEAD method for checking If-None-Match
        if ($request->isMethod('HEAD')) {
            $request->setMethod('GET');
        }

        $response = $next($request);

        // Setting etag
        $etag = md5($response->getContent());
        $response->setEtag($etag);

        $request->setMethod($method);

        return $response;
    }
}

class IfNoneMatch
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $method = $request->getMethod();

        if ($request->isMethod('HEAD')) {
            $request->setMethod('GET');
        }

        //Handle response
        $response = $next($request);

        $etag = '"'.md5($response->getContent()).'"';
        // array match
        $noneMatch = $request->getETags();

        if (in_array($etag, $noneMatch)) {
            // 304
            $response->setNotModified();
        }

        $request->setMethod($method);

        return $response;
    }
}

class IfMatch
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Next unless method is PATCH and If-Match header is set
        if (!($request->isMethod('PATCH') && $request->hasHeader('If-Match'))) {
            return $next($request);
        }

        // Create new GET request to same endpoint,
        // copy headers and add header that allows you to ignore this request in middlewares
        $getRequest = Request::create($request->getRequestUri(), 'GET');
        $getRequest->headers = $request->headers;
        $getRequest->headers->set('X-From-Middleware', 'IfMatch');
        $getResponse = app()->handle($getRequest);

        // Get content from response object and get hashes from content and etag
        $getContent = $getResponse->getContent();
        $getEtag = '"'.md5($getContent).'"';
        $ifMatch = $request->header('If-Match');

        // Compare current and request hashes
        if ($getEtag !== $ifMatch) {
            return response(null, 412);
        }

        return $next($request);
    }
}
