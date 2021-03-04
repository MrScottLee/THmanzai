# -*- coding: utf-8 -*-

import cgi, cgitb

form = cgi.FieldStorage()

a = form.getvalue('num')

print("<p>"+a+"</p>")