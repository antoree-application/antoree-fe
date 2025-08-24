import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Calendar, Award, Download, ExternalLink, X } from "lucide-react"

interface CertificateModalProps {
  certificate: {
    name: string
    image: string
    issueDate: string
    certificateId: string
    description?: string
  }
  isOpen: boolean
  onClose: () => void
}

export function CertificateModal({ certificate, isOpen, onClose }: CertificateModalProps) {
  const handleDownload = () => {
    // Create a temporary link element to download the certificate
    const link = document.createElement('a')
    link.href = certificate.image
    link.download = `${certificate.name.replace(/\s+/g, '_')}_Certificate.svg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleViewFullScreen = () => {
    window.open(certificate.image, '_blank')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Award className="h-6 w-6 text-blue-600" />
            Certificate Details
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Certificate Image */}
          <div className="relative">
            <Card className="overflow-hidden border-2 border-gray-200">
              <CardContent className="p-0">
                <img
                  src={certificate.image}
                  alt={certificate.name}
                  className="w-full h-auto max-h-[60vh] object-contain bg-gray-50"
                />
              </CardContent>
            </Card>
            
            {/* Verified Badge Overlay */}
            <div className="absolute top-4 right-4">
              <Badge className="bg-green-500 text-white px-3 py-1 font-semibold shadow-lg">
                <CheckCircle className="h-4 w-4 mr-1" />
                Verified Authentic
              </Badge>
            </div>
          </div>

          {/* Certificate Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Certificate Name</h3>
                <p className="text-gray-700 text-lg">{certificate.name}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Issue Date</h3>
                <div className="flex items-center gap-2 text-gray-700">
                  <Calendar className="h-4 w-4" />
                  <span>{certificate.issueDate}</span>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Certificate ID</h3>
                <code className="bg-gray-100 px-3 py-1 rounded font-mono text-sm">
                  {certificate.certificateId}
                </code>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Verification Status</h3>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-green-600 font-medium">Verified by Institution</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  This certificate has been independently verified and is authentic.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Validity</h3>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-500" />
                  <span className="text-blue-600 font-medium">Currently Valid</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Valid through December 2027
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          {certificate.description && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">About This Certification</h3>
              <p className="text-gray-700 leading-relaxed">{certificate.description}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
            <Button 
              onClick={handleViewFullScreen}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View Full Screen
            </Button>
            
            <Button 
              onClick={handleDownload}
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Certificate
            </Button>
            
            <Button 
              onClick={onClose}
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 ml-auto"
            >
              <X className="h-4 w-4 mr-2" />
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CertificateModal
